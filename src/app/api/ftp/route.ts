import { Client } from "basic-ftp";
import { NextResponse } from "next/server";
const CAMERA_IP = "192.168.1.1";

export async function GET() {
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

    return NextResponse.json({ files: imageFiles }, { status: 200 });
  } catch (error) {
    console.error("FTP Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve files from FTP" },
      { status: 500 }
    );
  } finally {
    client.close();
  }
}
