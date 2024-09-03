import styles from './Header.module.css'
import config from '../../config/config';

const Header = () => {
    const { texts } = config.language;

    console.log(texts[1].spn);

    const menu = [
        { text: texts[1].spn }
    ];

    return (
        <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.menu}>
                {menu.map(({ text }, index) => (
                    <div key={index}>{text}</div>
                ))}
            </div>
        </div>
    );
};

export default Header;