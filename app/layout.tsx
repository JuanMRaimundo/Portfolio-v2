import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// AQUÍ ES DONDE CAMBIAS EL TÍTULO DE LA PESTAÑA
export const metadata: Metadata = {
	title: "Juan M. Raimundo | Backend Developer",
	description:
		"Portfolio de Juan Marco Raimundo. Desarrollador Full Stack especializado en Backend, Node.js y Arquitectura de Software.",
	keywords: ["Backend", "Node.js", "Desarrollador", "Argentina", "Full Stack"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
