import { Card } from '../Card/Card';
import { useSelector } from 'react-redux';
import { containerCard } from './Home.module.css';
import { Loading } from '../Loading/Loading';

const Home = () => {
    const { Data = [] } = useSelector(state => state.products);

    return (
        <div>
            {Array.isArray(Data) && Data.length > 0
                ? <>
                    <div className={containerCard}>
                        {Data.map((props, index) =>
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