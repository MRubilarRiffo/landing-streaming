import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';
import { containerCard } from './Home.module.css';
import { Loading } from '../Loading/Loading';

const Home = () => {
    const { data = [] } = useSelector(state => state.products);

    return (
        <div>
            {Array.isArray(data) && data.length > 0
                ? <>
                    <div className={containerCard}>
                        {data.map((props, index) =>
                            <Card key={`product-${index}`} props={props} />
                        )}
                    </div>
                </>
                : <Loading />
            }
        </div>
    );
};

export { Home };