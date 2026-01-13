import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Juan M. Raimundo | Full Stack Developer",
	description:
		"Portfolio de Juan Marco Raimundo. Desarrollador Full Stack especializado en Backend, Node.js y Arquitectura de Software.",
	keywords: ["Backend", "Node.js", "Desarrollador", "Argentina", "Full Stack"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="es"
			className="scroll-smooth antialiased selection:bg-blue-500/30 selection:text-blue-200"
		>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
