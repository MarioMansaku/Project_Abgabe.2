import type { NextConfig } from "next";
const fs = require('fs');

const nextConfig: NextConfig = {
  /* config options here */
};

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./certificate.crt'),
};

export default nextConfig;
