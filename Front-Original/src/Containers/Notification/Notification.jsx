import styles from "./Notification.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Notification = () => {
    const names = [
        "Matías", "Diego", "Joaquín", "Tomás", "Sebastián", "Nicolás", "Lucas", "Alejandro",
        "Emilio", "Felipe", "Sofía", "Mario", "Isabel", "Florencia", "Catalina",
        "Camila", "Antonela", "Martina", "Victoria", "María"
    ];

    const { data } = useSelector(state => state.products);

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const notificationInterval = setInterval(() => {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }, 12000);
    
        return () => clearInterval(notificationInterval);
    }, []);

    const generateRandomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) return `${name.slice(0, maxLength - 3)}...`;
        return name;
    };

    const productsShow = data && data.length > 0 ? data[generateRandomNumber(0, data.length - 1)] : null;

    return showNotification && productsShow && (
        <div id={styles.container_notification} >
            <div id={styles.container_img}>
                <img src={productsShow?.image} alt="" />
            </div>
            <div id={styles.container_text}>
                <p>{names[generateRandomNumber(0, names.length - 1)]} compró <br/> {truncateName(productsShow?.name, 30)}</p>
                <p>Hace {generateRandomNumber(2, 50)} minutos.</p>
            </div>
        </div>
    );
};

export { Notification };