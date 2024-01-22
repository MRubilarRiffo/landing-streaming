import { containerLogo } from './Logo.module.css';
import logo from '../../assets/logoInnovoza.svg';

const Logo = () => {
    return (
        <div className={containerLogo}>
            <img src={logo} alt="innovoza" />
        </div>
    );
};

export { Logo };