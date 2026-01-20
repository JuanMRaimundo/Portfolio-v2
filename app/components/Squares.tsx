import { useRef, useEffect, useState } from "react";

interface SquaresProps {
	direction?: "diagonal" | "up" | "down" | "left" | "right";
	speed?: number;
	borderColor?: string;
	squareSize?: number;
	hoverFillColor?: string;
	className?: string;
}

const Squares: React.FC<SquaresProps> = ({
	direction = "right",
	speed = 0.5,
	borderColor = "#333",
	squareSize = 40,
	hoverFillColor = "#222",
	className,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestRef = useRef<number | null>(null);
	const numSquaresX = useRef<number>(0);
	const numSquaresY = useRef<number>(0);
	const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const [hoveredSquare, setHoveredSquare] = useState<{
		x: number;
		y: number;
	} | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
			numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const drawGrid = () => {
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
			const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

			for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
				for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
					const squareX = x - (gridOffset.current.x % squareSize);
					const squareY = y - (gridOffset.current.y % squareSize);

					if (
						hoveredSquare &&
						Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
						Math.floor((y - startY) / squareSize) === hoveredSquare.y
					) {
						ctx.fillStyle = hoverFillColor;
						ctx.fillRect(squareX, squareY, squareSize, squareSize);
					}

					ctx.strokeStyle = borderColor;
					ctx.lineWidth = 0.5;
					ctx.strokeRect(squareX, squareY, squareSize, squareSize);
				}
			}
		};

		const updateGrid = () => {
			const moveAmount = speed;
			if (direction === "right") gridOffset.current.x -= moveAmount;
			if (direction === "left") gridOffset.current.x += moveAmount;
			if (direction === "down") gridOffset.current.y -= moveAmount;
			if (direction === "up") gridOffset.current.y += moveAmount;
			if (direction === "diagonal") {
				gridOffset.current.x -= moveAmount;
				gridOffset.current.y -= moveAmount;
			}

			drawGrid();
			requestRef.current = requestAnimationFrame(updateGrid);
		};

		// Event listener para el hover
		const handleMouseMove = (event: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
			const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

			const hoveredX = Math.floor(
				(mouseX + (gridOffset.current.x % squareSize) - startX) / squareSize,
			);
			const hoveredY = Math.floor(
				(mouseY + (gridOffset.current.y % squareSize) - startY) / squareSize,
			);

			setHoveredSquare({ x: hoveredX, y: hoveredY });
		};

		const handleMouseLeave = () => {
			setHoveredSquare(null);
		};

		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseleave", handleMouseLeave);

		requestRef.current = requestAnimationFrame(updateGrid);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [
		direction,
		speed,
		borderColor,
		hoverFillColor,
		hoveredSquare,
		squareSize,
	]);

	return (
		<canvas
			ref={canvasRef}
			className={`w-full h-full border-none block ${className}`}
		/>
	);
};

export default Squares;
