import { Button } from "antd";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export function CheckProduct() {
  const qrRef = useRef(null);
  const [scanResultFile, setScanResultFile] = useState("");

  const onScanFile = () => {
    console.log("qrRef?.current", qrRef?.current);
    // qrRef?.current?.openImageDialog();
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  return (
    <>
      <QrReader
        ref={qrRef}
        delay={300}
        style={{ width: "100%" }}
        // onError={handleErrorFile}
        onScan={handleScanFile}
        legacyMode
      />
      <Button type='primary' htmlType='button' onClick={onScanFile}>
        scan file
      </Button>
      <h3>Scanned Code: {scanResultFile}</h3>
    </>
  );
}
