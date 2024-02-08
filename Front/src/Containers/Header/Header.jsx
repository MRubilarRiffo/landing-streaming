import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { title, breadcrumbs, triangle, triangleRight, triangleLeft, nav, space, header, menuContainer } from "./Header.module.css";

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
            <div className={triangle}>
                <div className={triangleLeft}></div>
                <div className={triangleRight}></div>
            </div>
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
                {
                    // <div>
                    //     {info.map((item, index) => (
                    //         <div key={`div-${index}`}>
                    //             <p key={`${item.info1}-${index}`}>{item.info1}</p>
                    //             <p key={`${item.info2}-${index}`}>{item.info2}</p>
                    //         </div>
                    //     ))}
                    // </div>
                }
            </div>
        </div>
    );
};

export { Header };