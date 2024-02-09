import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { title, breadcrumbs, nav, space, header, menuContainer } from "./Header.module.css";
import { Marquee_Effect } from "../Marquee Effect/Marquee Effect";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(item)
    };

    const menu = [
        { text: "Home", navigate: "/" },
        { text: "Reviews", navigate: "/reviews" },
    ];

    const info = [
        { info1: "+500", info2: "clientes" },
        { info1: "5.0", info2: "review" },
    ]

    const textBreadcrumbs = "Home";

    return (
        <div className={header}>
            <Marquee_Effect />
            <div className={space}>
                <div className={nav}>
                    <Logo />
                    <div className={menuContainer}>
                        {menu.map((item, index) => (
                            <a
                                key={`${item}-${index}`}
                                onClick={() => handleClick(item.navigate)}
                                >
                                {item.text}
                            </a>
                        ))}
                    </div>
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