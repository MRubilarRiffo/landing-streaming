import { Logo } from "../Logo/Logo";
import { title, breadcrumbs, nav, space, header, logo } from "./Header.module.css";
import { Marquee_Effect } from "../Marquee Effect/Marquee Effect";
import { Menu_Header } from "../Menu Header/Menu Header";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const textBreadcrumbs = "Home";

    const navigate = useNavigate();

    const handleClick = () => navigate('/');

    return (
        <div className={header}>
            <Marquee_Effect />
            <div className={space}>
                <div className={nav}>
                    <div
                        className={logo}
                        onClick={() => handleClick()}
                        >
                        <Logo />
                    </div>
                    <Menu_Header />
                </div>
                <div className={title}>
                    <h2>PRODUCTOS</h2>
                    <div className={breadcrumbs}>
                            <p>{textBreadcrumbs}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Header };