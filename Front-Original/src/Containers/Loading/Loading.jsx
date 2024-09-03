import { loading } from './Loading.module.css';
import img from '../../assets/loading.svg';

const Loading = () => {
    return (
        <div className={loading}>
            <img src={img} alt="loading" />
        </div>
    );
};

export { Loading };