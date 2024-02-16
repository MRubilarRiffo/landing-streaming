import { Logo } from "../Logo/Logo";
import { circle, info, background, title, breadcrumbs, nav, header, logo } from "./Header.module.css";
import { Top_Bar } from "../Top Bar/Top Bar";
import { Menu_Header } from "../Menu Header/Menu Header";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (value) => navigate(value);

    const arrayLocation = location.pathname.split('/');

    let textTitle = '';
    let textBreadcrumbs = null;

    if (arrayLocation[1] == '') {
        textTitle = 'HOME';
    } else {
        textTitle = arrayLocation[1].replace(/-/g, ' ').toLocaleUpperCase();
        textBreadcrumbs = textTitle;
    };

    return (
        <div className={header}>
            <div className={background}></div>
            <Top_Bar />
            <div className={info}>
                <div className={nav}>
                    <div
                        className={logo}
                        onClick={() => handleNavigate('/')}
                        >
                        <Logo />
                    </div>
                    <Menu_Header />
                </div>
                <div className={title}>
                    <h2>{textTitle}</h2>
                    {textBreadcrumbs &&
                        <div className={breadcrumbs}>
                            <p onClick={() => handleNavigate('/')} >HOME</p>
                            <div className={circle}></div>
                            <p>{textBreadcrumbs}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export { Header };