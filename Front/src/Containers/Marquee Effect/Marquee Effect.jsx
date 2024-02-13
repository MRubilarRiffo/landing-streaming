import { marquee, wrapper } from "./Marquee Effect.module.css";

const Marquee_Effect = () => {
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

export { Marquee_Effect };