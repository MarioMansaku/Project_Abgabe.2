import type { NextConfig } from "next";
const fs = require('fs');

const nextConfig: NextConfig = {
  /* config options here */
};

const httpsOptions = {
  key: fs.readFileSync('./src/config/tls/key.pem'),
  cert: fs.readFileSync('./src/config/tls/certificate.crt'),
};

export default nextConfig;
