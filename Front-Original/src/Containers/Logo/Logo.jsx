import { containerLogo } from './Logo.module.css';
import logo from '../../assets/logo.png';

const Logo = () => {
    return (
        <div className={containerLogo}>
            <img
                src={logo}
                alt="logo"
                />
        </div>
    );
};

export { Logo };