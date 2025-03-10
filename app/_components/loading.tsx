import Image from "next/image";
import React from "react";
import Circulo from "../../public/Circle.svg";
import Letras from "../../public/Letters.svg";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="spinner-container">
            <Image src={Letras} alt="Letters" className="static-letters" width={35} />
            <Image src={Circulo} alt="Loader" className="rotating-loader" width={600} height={600} />
        </div>
    );
};

export default LoadingSpinner;