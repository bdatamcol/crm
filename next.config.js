/** @type {import('next').NextConfig} */

const path = require('path');


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
    esmExternals: 'loose',
    outputFileTracingRoot: path.join(__dirname, '../../'), // Ahora path está definido
  },

  // Webpack config (optimizada para edge)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      worker_threads: false,
      path: require.resolve('path-browserify') // Añade esto si necesitas 'path' en frontend
    };
    return config;
  },
};


module.exports = nextConfig;