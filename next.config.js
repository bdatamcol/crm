/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Hace que Next.js falle si encuentra errores en los tipos
    ignoreBuildErrors: false,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  webpack: (config, { isServer }) => {
    // Esto asegura que Node.js (por ejemplo, MongoDB) se use solo del lado del servidor
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  },
};

module.exports = {
  // Habilita el host para conexiones locales
  server: {
    host: 'localhost',
    port: 3000,
  }
}