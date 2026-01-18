"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	Github,
	Linkedin,
	Mail,
	ExternalLink,
	Code2,
	Terminal,
	Cpu,
	Globe,
	Palette,
	Database,
	Menu,
	X,
	Languages,
	Server,
	LayoutTemplate,
	Instagram,
	ShoppingBag,
	Code,
} from "lucide-react";

// --- 1. COMPONENTE TYPEWRITER INTELIGENTE (Detecta Visibilidad) ---
const Typewriter = ({
	text,
	className = "",
}: {
	text: string;
	className?: string;
}) => {
	// Usamos un estado para saber si el elemento es visible en pantalla
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// Si entra en pantalla, activamos. Si sale, desactivamos (para que se repita al volver).
					if (entry.isIntersecting) {
						setIsVisible(true);
					} else {
						setIsVisible(false);
					}
				});
			},
			{ threshold: 0.1 }, // Se activa cuando se ve al menos el 10%
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) observer.disconnect();
		};
	}, []);

	const words = text.split(" ");

	return (
		<span
			ref={containerRef}
			className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
		>
			{words.map((word, wordIndex) => {
				const previousCharsCount = words
					.slice(0, wordIndex)
					.reduce((acc, w) => acc + w.length, 0);

				return (
					<span key={wordIndex} className="inline-block whitespace-nowrap">
						{word.split("").map((char, charIndex) => (
							<span
								key={charIndex}
								style={{
									transitionDelay: `${(previousCharsCount + charIndex) * 40}ms`,
								}}
								className={`inline-block transition-all duration-500 ease-out ${
									isVisible
										? "opacity-100 translate-y-0 blur-0"
										: "opacity-0 translate-y-2 blur-sm"
								}`}
							>
								{char}
							</span>
						))}
					</span>
				);
			})}
		</span>
	);
};

// --- 2. DATOS ---
const DATA = {
	es: {
		nav: {
			home: "Inicio",
			about: "Perfil",
			projects: "Proyectos",
			contact: "Contacto",
			cta: "Open to Work",
		},
		hero: {
			title1: "Arquitectura de Software",
			title2: "Full Stack",
			description:
				"Desarrollador enfocado en construir la lógica que impulsa aplicaciones robustas. Estudiante de la UTN con experiencia real transformando procesos manuales en soluciones digitales eficientes.",
			btnProject: "Ver Proyectos",
			btnContact: "Contáctame",
		},
		about: {
			title: "Perfil Técnico",
			subtitle: "Mi enfoque: Lógica sólida, escalabilidad y datos.",
			cardTitle: "Desarrollo Backend & Integración",
			cardDesc:
				"Me especializo en lo que no se ve pero hace que todo funcione. Desde diseñar APIs RESTful robustas en Node.js hasta modelar bases de datos SQL/NoSQL. Mi experiencia en una empresa de transportes me enseñó a crear sistemas que resuelven problemas reales de negocio.",
			tags: ["Node.js", "SQL/NoSQL", "API Design"],
		},
		projects: {
			title: "Proyectos y Experiencia",
			subtitle:
				"Soluciones donde la arquitectura y el backend son protagonistas.",
			link: "GitHub",
			demo: "Demo",
			repo: "Código",
		},
		contact: {
			title: "¿Trabajamos juntos?",
			desc: "Busco un rol donde pueda explotar mi capacidad de análisis y backend, mientras sigo cursando mi carrera en la UTN. Si necesitas alguien que entienda tanto el código como el negocio, hablemos.",
			btn: "Enviar Correo",
		},
		footer: "© 2025 Juan M. Raimundo. Desarrollador Full Stack.",
	},
	en: {
		nav: {
			home: "Home",
			about: "Profile",
			projects: "Projects",
			contact: "Contact",
			cta: "Open to Work",
		},
		hero: {
			title1: "Software Architecture",
			title2: "Full Stack",
			description:
				"Developer focused on building the logic that drives robust applications. UTN student with real-world experience transforming manual processes into efficient digital solutions.",
			btnProject: "View Projects",
			btnContact: "Contact Me",
		},
		about: {
			title: "Technical Profile",
			subtitle: "My focus: Solid logic, scalability, and data.",
			cardTitle: "Backend Development & Integration",
			cardDesc:
				"I specialize in what lies beneath the surface. From designing robust RESTful APIs in Node.js to modeling SQL/NoSQL databases. My experience in a transportation company taught me to build systems that solve real business problems.",
			tags: ["Node.js", "SQL/NoSQL", "API Design"],
		},
		projects: {
			title: "Projects & Experience",
			subtitle: "Solutions where architecture and backend take center stage.",
			link: "GitHub",
			demo: "Demo",
			repo: "Code",
		},
		contact: {
			title: "Let's work together?",
			desc: "I'm looking for a role where I can leverage my analytical and backend skills while continuing my degree at UTN. If you need someone who understands both code and business, let's talk.",
			btn: "Send Email",
		},
		footer: "© 2025 Juan M. Raimundo. Full Stack Developer.",
	},
};

const PROJECTS_DATA = [
	{
		title: "E-Commerce Backend Core",
		desc: {
			es: "Arquitectura completa de servidor para comercio electrónico. Diseñé una API RESTful escalable con Node.js y Express, implementando autenticación JWT, gestión compleja de carritos y validación estricta de datos para asegurar transacciones fiables.",
			en: "Complete server-side architecture for e-commerce. Designed a scalable RESTful API with Node.js and Express, implementing JWT authentication, complex cart management, and strict data validation to ensure reliable transactions.",
		},
		tags: ["Node.js", "Express", "MongoDB/SQL", "JWT"],
		link: "https://consistent-mabelle-jr-deeply-28cbae5f.koyeb.app/",
		github: "https://github.com/JuanMRaimundo/Ecommerce-BackEnd-SNS",
		featured: true,
		icon: (
			<Server
				size={48}
				className="text-gray-600 group-hover:text-blue-400 transition-colors transform group-hover:scale-110 duration-300"
			/>
		),
	},
	{
		title: "Analizador de Facturas con IA",
		desc: {
			es: "Plataforma de automatización financiera multi-cliente. Integré la IA de Google (Gemini) para procesar imágenes de facturas, extrayendo y estructurando automáticamente datos clave (importes, fechas) para eliminar la carga manual de datos.",
			en: "Multi-client financial automation platform. Integrated Google AI (Gemini) to process invoice images, automatically extracting and structuring key data (amounts, dates) to eliminate manual data entry.",
		},
		tags: ["Next.js", "Google Generative AI", "Full Stack"],
		link: "https://analizador-facturas-ia.vercel.app/",
		github: "https://github.com/JuanMRaimundo/analizador.facturasIA/",
		featured: true,
		icon: (
			<Cpu
				size={48}
				className="text-gray-600 group-hover:text-cyan-400 transition-colors transform group-hover:scale-110 duration-300"
			/>
		),
	},
	{
		title: "Dulzuras Bella - JS Frontend Core",
		desc: {
			es: "Aplicación SPA (Single Page Application) enfocada en los fundamentos del desarrollo web. Construida íntegramente con JavaScript Vanilla para demostrar dominio de la manipulación del DOM, gestión de estado asíncrono y consumo de APIs sin dependencia de frameworks. Implementa persistencia local y diseño responsivo.",
			en: "SPA (Single Page Application) focused on web development fundamentals. Built entirely with Vanilla JavaScript to demonstrate mastery of DOM manipulation, asynchronous state management, and API consumption without framework dependencies. Implements local persistence and responsive design.",
		},
		tags: ["JavaScript ES6+", "DOM Manipulation", "Bootstrap 5", "Async/Await"],
		link: "https://juanmraimundo.github.io/DulzurasBellaJS/",
		github: "https://github.com/JuanMRaimundo/DulzurasBellaJS",
		featured: true,
		icon: (
			<Code
				size={48}
				className="text-gray-600 group-hover:text-blue-400 transition-colors transform group-hover:scale-110 duration-300"
			/>
		),
	},
	{
		title: "Portfolio v1 (Legacy)",
		desc: {
			es: "Mi base en Frontend. Aunque hoy mi foco es el backend, este proyecto demuestra mi capacidad para construir y desplegar aplicaciones completas, entendiendo el ciclo de vida del software y la experiencia de usuario final.",
			en: "My Frontend foundation. Although my focus is now backend, this project demonstrates my ability to build and deploy complete applications, understanding the software lifecycle and end-user experience.",
		},
		tags: ["Angular", "Deployment", "SPA"],
		link: "https://jmraimundo-portfolio.netlify.app/",
		github: "https://github.com/JuanMRaimundo/JuanMRaimundo",
		featured: false,
		icon: (
			<LayoutTemplate
				size={48}
				className="text-gray-600 group-hover:text-purple-400 transition-colors transform group-hover:scale-110 duration-300"
			/>
		),
	},
	{
		title: "Simulador de Inversiones",
		desc: {
			es: "Colaboración técnica para Igroker. Participé en la planificación de endpoints del backend para optimizar la comunicación cliente-servidor, además de implementar la lógica frontend para visualizar proyecciones financieras en tiempo real.",
			en: "Technical collaboration for Igroker. Participated in backend endpoint planning to optimize client-server communication, in addition to implementing frontend logic to visualize financial projections in real-time.",
		},
		tags: ["Full Stack Logic", "API Planning", "Angular"],
		link: null,
		github: "https://github.com/JuanMRaimundo/i004-rooksafe-front",
		featured: false,
		icon: (
			<Database
				size={48}
				className="text-gray-600 group-hover:text-indigo-400 transition-colors transform group-hover:scale-110 duration-300"
			/>
		),
	},
];

const SKILLS = [
	{
		name: "Backend",
		icon: <Server size={20} />,
		description: "Node.js, Python, Express, API REST",
		color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	},
	{
		name: "Database",
		icon: <Database size={20} />,
		description: "SQL, MongoDB, Firebase",
		color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
	},
	{
		name: "Frontend",
		icon: <LayoutTemplate size={20} />,
		description: "Angular, React, DOM",
		color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
	},
	{
		name: "Tools",
		icon: <Terminal size={20} />,
		description: "Git, Postman, Linux",
		color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
	},
];

const Navbar = ({ lang, setLang, t }: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleLang = () =>
		setLang((prev: string) => (prev === "es" ? "en" : "es"));

	const links = [
		{ name: t.nav.home, href: "#home" },
		{ name: t.nav.about, href: "#about" },
		{ name: t.nav.projects, href: "#projects" },
		{ name: t.nav.contact, href: "#contact" },
	];

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-300 ${
				scrolled
					? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<a
					href="#"
					className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
				>
					Juan Marco Raimundo
				</a>

				<div className="hidden md:flex items-center gap-8">
					{links.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className="text-sm font-medium text-gray-400 hover:text-white transition-colors scroll-smooth"
						>
							{link.name}
						</a>
					))}

					<button
						onClick={toggleLang}
						className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all border border-white/5"
					>
						<Languages size={14} />
						<span>{lang.toUpperCase()}</span>
					</button>
				</div>

				<div className="flex items-center gap-4 md:hidden">
					<button
						onClick={toggleLang}
						className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white border border-white/5"
					>
						{lang.toUpperCase()}
					</button>
					<button onClick={() => setIsOpen(!isOpen)} className="text-white">
						{isOpen ? <X /> : <Menu />}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden absolute top-16 left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
					{links.map((link) => (
						<a
							key={link.name}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className="text-gray-300 hover:text-white text-lg"
						>
							{link.name}
						</a>
					))}
				</div>
			)}
		</nav>
	);
};

const Hero = ({ t }: any) => {
	// Mensaje para WhatsApp codificado
	const whatsappMessage =
		"Hola! Estamos interesados en tu perfil profesional y nos gustaría conversar sobre una oportunidad laboral.";
	const whatsappLink = `https://wa.me/5491163734198?text=${encodeURIComponent(
		whatsappMessage,
	)}`;

	return (
		<section
			id="home"
			className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
		>
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px]" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />

			<div className="max-w-4xl mx-auto px-6 text-center z-10">
				{/* LINK A WHATSAPP CON PUNTO AZUL TITILANTE */}
				<a
					href={whatsappLink}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 hover:bg-white/10 transition-colors cursor-pointer group"
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
					</span>
					<span className="text-xs text-gray-400 font-medium group-hover:text-blue-300 transition-colors">
						{t.nav.cta}
					</span>
				</a>

				<h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
					<Typewriter
						key={t.hero.title1}
						text={t.hero.title1}
						className="block font-mono tracking-tighter sm:tracking-normal justify-center"
					/>
					<span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
						{t.hero.title2}
					</span>
				</h1>

				<p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
					{t.hero.description}
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="#projects"
						className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 scroll-smooth"
					>
						{t.hero.btnProject} <Terminal size={18} />
					</a>
					<a
						href="#contact"
						className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 scroll-smooth shadow-lg shadow-blue-500/25"
					>
						{t.hero.btnContact} <Mail size={18} />
					</a>
				</div>
			</div>
		</section>
	);
};

const BentoGrid = ({ t }: any) => (
	<section id="about" className="py-20 bg-[#0a0a0a]">
		<div className="max-w-6xl mx-auto px-6">
			<div className="mb-12">
				<h2 className="text-3xl font-bold text-white mb-4">{t.about.title}</h2>
				<p className="text-gray-400">{t.about.subtitle}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors group">
					<div className="h-full flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
								<Server />
							</div>
							<h3 className="text-2xl font-bold text-white mb-2">
								{t.about.cardTitle}
							</h3>
							<p className="text-gray-400 leading-relaxed">
								{t.about.cardDesc}
							</p>
						</div>
						<div className="mt-8 flex gap-4">
							{t.about.tags.map((tag: any) => (
								<div
									key={tag}
									className="px-3 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/10"
								>
									{tag}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6">
					{SKILLS.map((skill, index) => (
						<div
							key={index}
							className={`p-6 rounded-2xl border ${skill.color} transition-all hover:translate-x-1`}
						>
							<div className="flex items-center gap-3 mb-2">
								{skill.icon}
								<h4 className="font-bold text-white">{skill.name}</h4>
							</div>
							<p className="text-sm opacity-80">{skill.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	</section>
);

const Projects = ({ lang, t }: any) => (
	<section id="projects" className="py-20">
		<div className="max-w-6xl mx-auto px-6">
			<div className="flex items-center justify-between mb-12">
				<div>
					<h2 className="text-3xl font-bold text-white mb-2">
						{t.projects.title}
					</h2>
					<p className="text-gray-400">{t.projects.subtitle}</p>
				</div>
				<a
					href="https://github.com/JuanMRaimundo"
					target="_blank"
					rel="noopener noreferrer"
					className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
				>
					{t.projects.link} <ExternalLink size={16} />
				</a>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{PROJECTS_DATA.map((project, index) => (
					<div
						key={index}
						className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
					>
						<div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
							<div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
							{project.icon}
						</div>

						<div className="p-6 flex-1 flex flex-col">
							<h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
								{project.title}
							</h3>

							<p className="text-gray-400 text-sm mb-6 flex-1">
								{/* @ts-ignore */}
								{project.desc[lang]}
							</p>

							<div className="flex flex-wrap gap-2 mb-6">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10"
									>
										{tag}
									</span>
								))}
							</div>

							<div className="flex items-center gap-4 mt-auto">
								<a
									href={project.github}
									target="_blank"
									className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
								>
									<Github size={18} /> {t.projects.repo}
								</a>

								{project.link && (
									<a
										href={project.link}
										target="_blank"
										className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
									>
										<ExternalLink size={18} /> {t.projects.demo}
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

const Contact = ({ t }: any) => (
	<section id="contact" className="py-20 bg-[#0a0a0a] relative">
		<div className="max-w-4xl mx-auto px-6 text-center">
			<h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
			<p className="text-gray-400 mb-10 max-w-xl mx-auto">{t.contact.desc}</p>

			<a
				href="mailto:juanmr.093@gmail.com"
				className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
			>
				<Mail size={20} />
				{t.contact.btn}
			</a>

			<div className="mt-12 flex justify-center gap-6">
				<a
					href="https://github.com/JuanMRaimundo"
					target="_blank"
					className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
				>
					<Github size={24} />
				</a>
				<a
					href="https://linkedin.com/in/juan-marco-raimundo-984924141"
					target="_blank"
					className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
				>
					<Linkedin size={24} />
				</a>
				<a
					href="https://www.instagram.com/juanraim/?utm_source=qr&igsh=YzU1NGVlODEzOA%3D%3D#"
					target="_blank"
					className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
				>
					<Instagram size={24} />
				</a>
			</div>
		</div>
		<div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
	</section>
);

const Footer = ({ t }: any) => (
	<footer className="py-8 text-center text-gray-500 text-sm">
		<p>{t.footer}</p>
	</footer>
);

export default function App() {
	// @ts-ignore
	const [lang, setLang] = useState("es");
	// @ts-ignore
	const t = DATA[lang];

	return (
		<div className="bg-black min-h-screen text-gray-200 selection:bg-blue-500/30">
			<Navbar lang={lang} setLang={setLang} t={t} />
			<main>
				<Hero t={t} />
				<BentoGrid t={t} />
				<Projects lang={lang} t={t} />
				<Contact t={t} />
			</main>
			<Footer t={t} />
		</div>
	);
}
