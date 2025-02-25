"use client";
// Next.js-based Camera Connection (FTP or SMB Transfer) using API routes
import { useEffect, useState } from "react";

const CAMERA_IP = "192.168.1.1"; // Change this based on the actual camera IP

export default function CameraSync() {
  const [ftpFiles, setFtpFiles] = useState([]);
  const [smbFiles, setSmbFiles] = useState([]);
  const [wifiStatus, setWifiStatus] = useState(false);
  const [cip, setcip] = useState("");
  const [CIP, setCIP] = useState("");
  const [servicesStatus, setServicesStatus] = useState({
    ftp: false,
    smb: false,
  });

  useEffect(() => {
    checkWiFiConnection();
  }, [CIP, checkWiFiConnection]);

  async function checkWiFiConnection() {
    try {
      const response = await fetch("/api/check-services", {
        method: "POST",
        body: JSON.stringify({ cip: CIP || CAMERA_IP }),
      });
      const data = await response.json();
      setWifiStatus(data.wifi);
      setServicesStatus({ ftp: data.ftp, smb: data.smb });
    } catch (error) {
      console.error("No active internet connection:", error);
      setWifiStatus(false);
    }
  }

  async function fetchImages(type: string) {
    try {
      const response = await fetch(`/api/${type}`);
      const data = await response.json();
      if (type === "ftp") {
        setFtpFiles(data.files);
      } else setSmbFiles(data.files);
    } catch (error) {
      console.error(`Error fetching ${type} images:`, error);
    }
  }

  return (
    <div>
      <label>
        Camera IP:
        <input
          type="text"
          className="bg-transparent px-2x py-3 border"
          onChange={(e) => setcip(e.target.value)}
        />
      </label>
      <button onClick={() => setCIP(cip)}>SET</button>
      <h2>WiFi Status: {wifiStatus ? "Connected" : "Disconnected"}</h2>
      <h2>FTP Service: {servicesStatus.ftp ? "Available" : "Unavailable"}</h2>
      <h2>SMB Service: {servicesStatus.smb ? "Available" : "Unavailable"}</h2>
      <button onClick={() => fetchImages("ftp")}>Fetch FTP Images</button>
      <button onClick={() => fetchImages("smb")}>Fetch SMB Images</button>
      <h2>Camera FTP Files</h2>

      <ul>
        {ftpFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
      <h2>Camera SMB Files</h2>
      <ul>
        {smbFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>

      <div className="mt-10">{JSON.stringify(ftpFiles)}</div>
    </div>
  );
}
