import styles from './Purchase Options.module.css';

const PurchaseOptions = ({ setShowPurchaseOptions }) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <button className={styles.closeButton} onClick={() => setShowPurchaseOptions(false)}>X</button>
            </div>
        </div>
    );
};

export default PurchaseOptions;