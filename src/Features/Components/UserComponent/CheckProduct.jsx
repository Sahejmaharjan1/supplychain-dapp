import { Alert, Button, message, Upload } from "antd";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ProductInfoModal } from "../CoreUI/ProductInfoModal/ProductInfoModal";
import QRcode from "qrcode";
const QrReader = dynamic(() => import("react-qr-scanner"), {
  ssr: false,
});
import QrScanner from "qr-scanner";
import { useWeb3Context } from "../../../Utils/Web3Context";

export function CheckProduct() {
  const qrRef = useRef(null);
  const [scanResultFile, setScanResultFile] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { ercContract, currentAccount } = useWeb3Context();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productData, setProductData] = useState(null);
  const [visible, setVisible] = useState(false);

  const props = {
    name: "file",
    multiple: false,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setFile(info.file);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onScanFile = (data) => {
    console.log(qrRef.current, data);
  };
  const handleErrorFile = () => {
    console.log("error ");
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const onScan = async () => {
    console.log("send", file);
    setVisible(false);
    try {
      const result = await QrScanner.scanImage(file.originFileObj);
      console.log("result", result);
      const response = await QRcode.toDataURL(result);
      setImageUrl(response);
      const resultData = await ercContract.methods.searchProduct(result).call();
      const val = await ercContract.methods.allProducts(result).call();
      console.log("resultData", resultData);
      setProductData({
        key: val.productId,
        name: val.productName,
        price: val.price,
        address: resultData,
        tags: val.tags.split(","),
        detail: val.description,
        registeredName: val.registeredName,
        manufactureAddress: val.manufactureAddress,
      });
      setIsModalVisible(true);
    } catch (e) {
      console.log("err", e);
      setVisible(true);
    }
  };
  return (
    <>
      {visible && (
        <Alert
          message='Error'
          description='No product found'
          type='error'
          showIcon
          closable
          banner
        />
      )}
      <QrReader
        ref={qrRef}
        style={{ width: "100%", height: "300px" }}
        onError={handleErrorFile}
        onScan={handleScanFile}
        legacyMode
      />
      <Button variant='contained' color='secondary' onClick={onScanFile}>
        Scan Qr Code
      </Button>
      <Upload {...props} maxCount={1}>
        <Button>Click to Upload</Button>
      </Upload>
      <Button variant='contained' color='secondary' onClick={onScan}>
        Scan
      </Button>
      <h3>Scanned Code: {scanResultFile}</h3>
      <ProductInfoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        productData={productData}
        imageUrl={imageUrl}
      />
    </>
  );
}
