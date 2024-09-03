import styles from './Card.module.css';
import formatPrice from '../../../../functions/formatPrice';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import randomNumber from '../../../../functions/randomNumber';
import { MdKeyboardDoubleArrowDown, MdCheck  } from 'react-icons/md';

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

const Card = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/${product.slug}/${product.id}`, { state: product });
    }, [navigate, product]);

    const [newPurchases, setNewPurchases] = useState(() => Array(5).fill().map(nameRandom));
    const [moving, setMoving] = useState(false);
    const [minutesRandom, setMinutesRandom] = useState(randomNumber(3, 59));
    const [shortDescription, setShortDescription] = useState(JSON.parse(product.shortDescription));
    const [moreInfo, setMoreInfo] = useState(false);

    useEffect(() => {
        const notificationInterval = setInterval(() => {
            setMinutesRandom(randomNumber(3, 59));
            setMoving(true);
            setNewPurchases(prevPurchases => [...prevPurchases.slice(1), nameRandom()]);
            setTimeout(() => setMoving(false), 300);
        }, randomNumber(2000, 8000));
    
        return () => clearInterval(notificationInterval);
    }, []);

    const handleClickMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={handleClick}>
                <div className={styles.name}>
                    <h3>{product.name}</h3>
                </div>
                <div className={styles.info}>
                    <div className={styles.newpurchases}>
                        {`${newPurchases[newPurchases.length - 1].name} compró hace ${minutesRandom} minutos.`}
                    </div>
                    <div className={styles.price}>{formatPrice(product.priceOffert, 'Chile')}</div>
                    <div className={styles.line}>
                        <div/>
                    </div>
                    <div className={styles.purchaseNotification}>
                        <div className={styles.containerNotification}>
                            {newPurchases.map(({ name, color }, index) => (
                                <div
                                    key={index}
                                    className={`${styles.notification} ${index === 0 ? styles['notification-1'] : ''}`}>
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
            <div className={styles.cardDescription}>
                {shortDescription.length > 0 &&
                    <div className={styles.containerList}>
                        <div className={styles.list}>
                            {shortDescription.slice(0, moreInfo ? shortDescription.length : 3).map((description, index) => (
                                <div className={styles.description} key={`description-${index}`}>
                                    <div className={styles.iconCheck}><MdCheck /></div>
                                    <p className={!moreInfo ? styles.noActiveMoreInfo : ''}>{description}</p>
                                </div>
                            ))}
                        </div>
                        <MdKeyboardDoubleArrowDown
                            onClick={handleClickMoreInfo}
                            className={`${styles.iconArrow} ${moreInfo ? styles.rotate : ''}`}
                        />
                    </div>
                }
                <button className={styles.btnPayNow}>Comprar Ahora</button>
            </div>
        </div>
    );
};

export default Card;