import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';

const Home = () => {
    const products = useSelector(state => state.products);

    return (
        <div id={styles.home}>
            <h1>Home</h1>
            <div id={styles.products}>
                <h2>Productos</h2>
                {
                    products?.length > 0
                        ? <div className={styles.container_card}>
                            {
                                products?.map((props, index) =>
                                    <Card key={`product-${index}`} props={props} />
                                )
                            }
                        </div>
                        : <h3>Cargando..</h3>
                }
            </div>
        </div>
    );
};

export { Home };