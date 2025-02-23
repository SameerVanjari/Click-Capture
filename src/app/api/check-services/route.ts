import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "basic-ftp";
import dns from "dns";

const CAMERA_IP = "192.168.1.1";
// API Routes
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  const { cip } = await req.json();

  const wifi = await checkWiFi();
  const ftp = await checkFTP(cip);
  const smb = false;
  return new Response(JSON.stringify({ wifi, ftp, smb }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function checkWiFi() {
  return new Promise((resolve) => {
    dns.lookup("google.com", (err) => {
      resolve(!err);
    });
  });
}

async function checkFTP(cip: string) {
  const client = new Client();
  try {
    await client.access({
      host: cip || CAMERA_IP,
      user: "anonymous",
      password: "",
      secure: false,
    });
    client.close();
    return true;
  } catch {
    return false;
  }
}

// async function checkSMB() {
//   const smbClient = new smb2({
//     share: `\\${CAMERA_IP}\shared`,
//     domain: "",
//     username: "guest",
//     password: "",
//   });
//   return new Promise((resolve) => {
//     smbClient.readdir("", (err) => {
//       resolve(!err);
//     });
//   });
// }
