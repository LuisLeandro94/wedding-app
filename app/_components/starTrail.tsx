import { useEffect } from "react";

const StarTrail: React.FC = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const arr = [1, 0.9, 0.8, 0.5, 0.2];

            arr.forEach((i) => {
                const x = (1 - i) * 75;
                const star = document.createElement("div");

                star.className = "star";
                star.style.top = `${e.pageY + Math.round(Math.random() * x - x / 2)}px`;
                star.style.left = `${e.pageX + Math.round(Math.random() * x - x / 2)}px`;

                document.body.appendChild(star);

                setTimeout(() => {
                    document.body.removeChild(star);
                }, Math.round(Math.random() * i * 600));
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
};

export default StarTrail;
