import styles from './Home.module.css';
import { useSelector } from 'react-redux';
import Card from './components/Card/Card';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    const { data } = useSelector((state) => state.products);

    if (!data) {
        return <Loader />;
    };

    return (
        <div className={styles.home}>
            <div className={styles.info}>
                <div className={styles.texts}>
                    <h2>Comparta la suscripción premium más barato en GamsGo</h2>
                </div>

                <div className={styles.line}></div>
            </div>
            <div className={styles.cards}>
                {data.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;