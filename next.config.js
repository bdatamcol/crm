const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  reactStrictMode: true,
  generateEtags: false,
  
  eslint: { 
    ignoreDuringBuilds: true 
  },
  typescript: { 
    ignoreBuildErrors: true 
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },

  // Elimina temporalmente la configuración experimental problemática
  /* experimental: {
    runtime: 'edge',
    serverComponentsExternalPackages: ['mongoose'],
    esmExternals: 'loose',
    outputFileTracingRoot: path.join(__dirname, '../../'),
  }, */

  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      worker_threads: false,
      path: false
    };
    return config;
  }
};

module.exports = nextConfig;