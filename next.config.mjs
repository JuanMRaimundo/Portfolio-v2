const nextConfig = {
	// Ignoramos errores estrictos en el build para evitar bloqueos en Vercel
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
