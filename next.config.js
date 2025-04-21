/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración esencial para Cloudflare
  output: 'standalone',
  reactStrictMode: true,
  
  // Configuración para MongoDB
  serverExternalPackages: ['mongoose'],
  
  // Optimizaciones de construcción
  outputFileTracingRoot: process.cwd(),
  swcMinify: true,
  
  // Manejo de errores
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración de Webpack para compatibilidad
  webpack: (config) => {
    // Fallbacks para módulos de Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      net: false,
      tls: false,
      child_process: false,
      mongodb: false,
      '@tailwindcss/postcss': require.resolve('@tailwindcss/postcss')
    };
    
    return config;
  }
};

module.exports = nextConfig;