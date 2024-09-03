import { useNavigate } from "react-router-dom";
import { logo, containerLogoAndClose, menu, icon, display, menuMobile, background, iconClose, menuOpen } from "./Menu Header.module.css";
import { RiMenuFill } from "react-icons/ri";
import { GiCrossedSwords } from "react-icons/gi";
import { useState } from "react";
import { Logo } from "../Logo/Logo";

const Menu_Header = () => {
    const navigate = useNavigate();

    const menuText = [
        { text: "Home", navigate: "/" },
        { text: "Reviews", navigate: "/reviews" },
    ];
    
    const [displayMenu, setDisplayMenu] = useState(false);
    
    const handleClick = (item) => {
        navigate(item);
        handleDisplayMenu();
    };
    const handleDisplayMenu = () => {
        setDisplayMenu(!displayMenu);
    };

    const MenuDisplay = () => {
        return (
            <div className={menu}>
                {menuText.map((item, index) => (
                    <a
                        key={`${item}-${index}`}
                        onClick={() => handleClick(item.navigate)}
                        >
                        {item.text}
                    </a>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div
                className={icon}
                onClick={() => handleDisplayMenu()}
                >
                <RiMenuFill />
            </div>
            <div className={display}>
                <MenuDisplay />
            </div>
            <div>
                {displayMenu && <div className={background}></div>}
                <div className={`${menuMobile} ${displayMenu ? menuOpen : ''}`}>
                    <div className={containerLogoAndClose}>
                        <div className={logo}>
                            <Logo />
                        </div>
                        <GiCrossedSwords
                            className={iconClose}
                            onClick={() => handleDisplayMenu()}
                            />
                    </div>
                    <MenuDisplay />
                </div>
            </div>
        </div>
    );
};

export { Menu_Header };