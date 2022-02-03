import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { ProductInfoModal } from "../CoreUI/ProductInfoModal/ProductInfoModal";
import QrScanner from "qr-scanner";
import { useWeb3Context } from "../../../Utils/Web3Context";

export function ScanShipmentProduct() {
  const [scanResultFile, setScanResultFile] = useState("");
  const [file, setFile] = useState(null);
  const { ercContract, currentAccount } = useWeb3Context();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productData, setProductData] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((result) => {
        console.log("resultll", result);
        setLatitude(result.coords.latitude);
        setLongitude(result.coords.longitude);
      });
    }
  }, []);

  const props = {
    name: "file",
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

  const onScan = () => {
    console.log("send", file);
    QrScanner.scanImage(file.originFileObj)
      .then(async (result) => {
        console.log("result", result);
        var receipt = await ercContract.methods
          .addState(result, `longitude: ${longitude} latitude: ${latitude}`)
          .send({ from: currentAccount, gas: 1000000 });
        console.log("receipt", receipt);
        // setProductData({
        //   key: result,
        //   name: val.productName,
        //   price: val.price,
        //   address: "New York No. 1 Lake Park",
        //   tags: val.tags.split(","),
        // });
        // setIsModalVisible(true);
      })
      .catch((e) => console.log("error", e));
  };
  return (
    <>
      <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload>
      <>latitude: {latitude}</>
      <>longitude: {longitude}</>
      <Button variant='contained' color='secondary' onClick={onScan}>
        Update Scan Shipment
      </Button>
      <ProductInfoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        productData={productData}
      />
    </>
  );
}
