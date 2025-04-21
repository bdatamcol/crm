/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración esencial para Cloudflare
  output: 'standalone', // ¡Clave para solucionar el error de directorio!
  distDir: '.next', // Explícitamente define el directorio
  
  // Configuración base
  reactStrictMode: true,
  generateEtags: false, // Mejor rendimiento en edge
  
  // Manejo de errores
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },

  // Variables de entorno
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },

  // Configuración experimental para Cloudflare
  experimental: {
    runtime: 'edge',
    serverComponentsExternalPackages: ['mongoose'],
    esmExternals: 'loose', // Mejor compatibilidad
    outputFileTracingRoot: path.join(__dirname, '../../'), // Si usas monorepo
  },

  // Webpack config (optimizada para edge)
  webpack: (config) => {
    // Resuelve el fallback para módulos de Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      worker_threads: false
    };
    return config;
  },
};

// Asegúrate de tener 'path' requerido si usas outputFileTracingRoot
const path = require('path');
module.exports = nextConfig;