import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "basic-ftp";
const CAMERA_IP = "192.168.1.1";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: CAMERA_IP,
      user: "anonymous", // Update with correct user if required
      password: "",
      secure: false,
    });

    const fileList = await client.list();
    const imageFiles = fileList
      .filter((file) => file.name.match(/\.(jpg|jpeg|png)$/i))
      .map((file) => file.name);

    res.json({ files: imageFiles });
  } catch (error) {
    console.error("FTP Error:", error);
    res.status(500).json({ error: "Failed to retrieve files from FTP" });
  } finally {
    client.close();
  }
}
