

import { useEffect, useRef } from "react";

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const layerCount = 3;
    const baseStarCount = 50;

    useEffect(() => {
        const speeds = [0.05, 0.1, 0.2];
        let stars: { x: number; y: number; size: number; speed: number; opacity: number; baseOpacity: number; layer: number }[] = [];
        let shootingStar: { x: number; y: number; length: number; speed: number; opacity: number; dx: number; dy: number } | null = null;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars();
        };

        const createStars = () => {
            stars = [];
            const scalingFactor = Math.max(canvas.width, canvas.height) / 1000;
            for (let i = 0; i < layerCount; i++) {
                const starCount = Math.floor(baseStarCount * scalingFactor * (i + 1));
                for (let j = 0; j < starCount; j++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * (i + 1) + 0.5,
                        speed: speeds[i],
                        opacity: Math.random(),
                        baseOpacity: Math.random() * 0.5 + 0.5,
                        layer: i,
                    });
                }
            }
        };

        const updateStars = () => {
            stars.forEach((star) => {
                star.y += star.speed; // Move stars downward

                star.opacity =
                    star.baseOpacity + Math.sin(Date.now() * 0.001 * star.speed) * 0.3; // Twinkling effect

                // Reset star position when it goes off-screen (bottom)
                if (star.y > canvas.height) {
                    star.y = 0; // Reset to the top
                    star.x = Math.random() * canvas.width;
                }
            });
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 8,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width
            );
            gradient.addColorStop(0, "#0D1017");
            gradient.addColorStop(1, "#000000");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });
        };

        const createShootingStar = () => {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const angle = Math.random() * Math.PI * 2;
            const length = Math.random() * 300 + 100;
            const speed = Math.random() * 4 + 2;
            shootingStar = { x: startX, y: startY, length, speed, opacity: 1, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed };
            setTimeout(createShootingStar, Math.random() * 2500 + 5000);
        };

        const updateShootingStar = () => {
            if (!shootingStar) return;
            shootingStar.x += shootingStar.dx;
            shootingStar.y += shootingStar.dy;
            shootingStar.opacity -= 0.01;
            if (shootingStar.opacity <= 0 || shootingStar.x < 0 || shootingStar.x > canvas.width || shootingStar.y < 0 || shootingStar.y > canvas.height) {
                shootingStar = null;
            }
        };

        const drawShootingStar = () => {
            if (!shootingStar) return;
            const gradient = ctx.createLinearGradient(
                shootingStar.x,
                shootingStar.y,
                shootingStar.x - shootingStar.dx * shootingStar.length,
                shootingStar.y - shootingStar.dy * shootingStar.length
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(
                shootingStar.x - shootingStar.dx * shootingStar.length,
                shootingStar.y - shootingStar.dy * shootingStar.length
            );
            ctx.stroke();
            ctx.closePath();
        };

        const animate = () => {
            updateStars();
            updateShootingStar();
            drawStars();
            drawShootingStar();
            requestAnimationFrame(animate);
        };

        resizeCanvas();
        createStars();
        setTimeout(createShootingStar, Math.random() * 1000);
        animate();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 " />;
};

export default Starfield;
