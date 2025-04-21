/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  
  // Nueva sintaxis para Next.js 15 (reemplaza experimental.*)
  serverExternalPackages: ['mongoose'], // Reemplaza experimental.serverComponentsExternalPackages
  outputFileTracingRoot: process.cwd(), // Reemplaza experimental.outputFileTracingRoot
  
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false, // Elimina path-browserify si no es esencial
      mongodb: false // Añadido para compatibilidad con MongoDB
    };
    return config;
  }
};

module.exports = nextConfig;