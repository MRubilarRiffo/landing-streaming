import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { headerContainer, menuContainer } from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(item)
    };

    const menu = [
        { text: "Inicio", navigate: "/" },
        { text: "Reviews", navigate: "/reviews" },
    ];

    const info = [
        { info1: "+500", info2: "clientes" },
        { info1: "5.0", info2: "review" },
    ]

    return (
        <div className={headerContainer}>
            <Logo />
            <div className={menuContainer}>
                {menu.map((item, index) => (
                    <p
                        key={`${item}-${index}`}
                        onClick={() => handleClick(item.navigate)}
                        >
                        {item.text}
                    </p>
                ))}
            </div>
            <div>
                {info.map((item, index) => (
                    <div key={`div-${index}`}>
                        <p key={`${item.info1}-${index}`}>{item.info1}</p>
                        <p key={`${item.info2}-${index}`}>{item.info2}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Header };