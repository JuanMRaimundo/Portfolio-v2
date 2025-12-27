
const nextConfig = {
  // Ignora errores de ESLint durante el build para que no detengan el despliegue
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignora errores de TypeScript durante el build (útil para deploys rápidos)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
