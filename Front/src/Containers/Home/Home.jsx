import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';
import { containerCard } from './Home.module.css';
import { Logo } from '../Logo/Logo';
import { Loading } from '../Loading/Loading';

const Home = () => {
    const products = useSelector(state => state.products);

    return (
        <>  
        {products?.length > 0
            ? <>
                <Logo />
                <h2>Productos</h2> 
                <div className={containerCard}>
                    {products?.map((props, index) =>
                        <Card key={`product-${index}`} props={props} />
                    )}
                </div>
            </>
            : <Loading /> 
                
            }
        </>
    );
};

export { Home };