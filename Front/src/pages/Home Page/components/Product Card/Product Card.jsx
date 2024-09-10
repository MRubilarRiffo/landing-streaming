import styles from './Product Card.module.css';
import formatPrice from '../../../../functions/formatPrice';
import { memo, useEffect, useState } from 'react';
import randomNumber from '../../../../functions/randomNumber';

const namesWithColors = [
    { name: "Matías", color: "#607D8B" },   // Slate Gray
    { name: "Diego", color: "#8E44AD" },    // Wisteria
    { name: "Joaquín", color: "#3498DB" },  // Peter River
    { name: "Tomás", color: "#2ECC71" },    // Emerald
    { name: "Sebastián", color: "#1ABC9C" },// Turquoise
    { name: "Nicolás", color: "#2980B9" },  // Belize Hole
    { name: "Lucas", color: "#16A085" },    // Green Sea
    { name: "Alejandro", color: "#27AE60" },// Nephritis
    { name: "Emilio", color: "#9B59B6" },   // Amethyst
    { name: "Felipe", color: "#34495E" },   // Wet Asphalt
    { name: "Sofía", color: "#7F8C8D" },    // Asbestos
    { name: "Mario", color: "#2C3E50" },    // Midnight Blue
    { name: "Isabel", color: "#8E44AD" },   // Wisteria
    { name: "Florencia", color: "#3498DB" },// Peter River
    { name: "Catalina", color: "#27AE60" }, // Nephritis
    { name: "Camila", color: "#2ECC71" },   // Emerald
    { name: "Antonela", color: "#16A085" }, // Green Sea
    { name: "Martina", color: "#2980B9" },  // Belize Hole
    { name: "Victoria", color: "#1ABC9C" }, // Turquoise
    { name: "María", color: "#34495E" },    // Wet Asphalt
    { name: "Valentina", color: "#9B59B6" },// Amethyst
    { name: "Pablo", color: "#607D8B" },    // Slate Gray
    { name: "Gabriel", color: "#2C3E50" },  // Midnight Blue
    { name: "Lucía", color: "#8E44AD" },    // Wisteria
    { name: "Juan", color: "#3498DB" },     // Peter River
    { name: "Elena", color: "#27AE60" },    // Nephritis
    { name: "Ignacio", color: "#2ECC71" },  // Emerald
    { name: "Manuel", color: "#16A085" },   // Green Sea
    { name: "Daniela", color: "#2980B9" },  // Belize Hole
    { name: "Javier", color: "#1ABC9C" },   // Turquoise
    { name: "Renata", color: "#34495E" },   // Wet Asphalt
    { name: "Agustín", color: "#7F8C8D" },  // Asbestos
    { name: "Francisco", color: "#2C3E50" },// Midnight Blue
    { name: "Paula", color: "#8E44AD" },    // Wisteria
    { name: "Gabriela", color: "#3498DB" }, // Peter River
    { name: "Andrea", color: "#27AE60" },   // Nephritis
    { name: "Federico", color: "#2ECC71" }, // Emerald
    { name: "Ana", color: "#16A085" },      // Green Sea
    { name: "Jorge", color: "#2980B9" },    // Belize Hole
    { name: "Carolina", color: "#34495E" }  // Wet Asphalt
];

const nameRandom = () => namesWithColors[Math.floor(Math.random() * namesWithColors.length)];

const PriceView = memo(({ product }) => {
    const { price } = styles;
    const { variation, salePrice } = product || { variation: false, salePrice: 0 };
    const { minPrice, maxPrice } = product.Variations[0] || { minPrice: 0, maxPrice: 0 };
    
    return (
        <div className={price}>
            {variation === true
            ? <p>{`${formatPrice(minPrice, 'Chile')} - ${formatPrice(maxPrice, 'Chile')}`}</p>
            : <p>{formatPrice(salePrice, 'Chile')}</p>}
        </div>
    );
});

const ProductCard = ({ product }) => {
    const [state, setState] = useState({
        newPurchases: Array(5).fill().map(nameRandom),
        moving: false,
        minutesRandom: randomNumber(3, 59),
    });

    useEffect(() => {
        const notificationInterval = setInterval(() => {
            setState(prevState => ({
                ...prevState,
                minutesRandom: randomNumber(3, 59),
                moving: true,
                newPurchases: [...prevState.newPurchases.slice(1), nameRandom()],
            }));
            setTimeout(() => setState(prevState => ({
                ...prevState,
                moving: false,
            })), 300);
        }, randomNumber(2000, 8000));
        
        return () => clearInterval(notificationInterval);
    }, []);

    const { newPurchases, moving, minutesRandom } = state;
    const { card, name, info, newpurchases, line, purchaseNotification, containerNotification, notification } = styles;

    return (
        <div className={card}>
            <div className={name}>
                <h3>{product.name}</h3>
            </div>
            <div className={info}>
                <div className={newpurchases}>
                    {`${newPurchases[newPurchases.length - 1].name} compró hace ${minutesRandom} minutos.`}
                </div>
                <PriceView product={product} />
                <div className={line}>
                    <div/>
                </div>
                <div className={purchaseNotification}>
                    <div className={containerNotification}>
                        {newPurchases.map(({ name, color }, index) => (
                            <div
                                key={index}
                                className={`${notification} ${index === 0 ? styles['notification-1'] : ''}`}>
                                <div
                                    style={{ backgroundColor: color }}
                                    className={`${moving ? styles[`moving-${newPurchases.length - index}`] : ''}`}>
                                    {name[0]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;