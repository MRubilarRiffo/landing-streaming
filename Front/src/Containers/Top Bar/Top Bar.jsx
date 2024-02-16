import { marquee, wrapper } from "./Top Bar.module.css";

const Top_Bar = () => {
    const texts = ['¡ PAGA EN HASTA 12 CUOTAS !', '+500 CLIENTES'].join('\t');

    return (
        <div className={marquee}>
            <div className={wrapper}>
                <p>{texts}</p>
                <p>{texts}</p>
            </div>
        </div>
    );
};

export { Top_Bar };