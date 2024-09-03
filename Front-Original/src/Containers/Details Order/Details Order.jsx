import { format_Price } from '../../Functions/Format Price';
import { line, detailsOrder, containerProps, props } from './Details Order.module.css';

const Details_Order = ({ quantity, price, name }) => {
    
    const titles = ["Producto", "Cantidad", "Subtotal"];

    return (
        <div className={detailsOrder}>
            <h4>TU PEDIDO</h4>
            <div className={containerProps}>
                {titles.map((item, index) => (
                    <h5
                        key={index}
                        className={props}
                        >
                        {item}
                    </h5>
                ))}
            </div>
            <div className={containerProps}>
                <p className={props}>{name}</p>
                <p className={props}>{quantity}</p>
                <p className={props}>{format_Price(price * quantity)}</p>
            </div>
            <div className={line}></div>
            <div className={containerProps}>
                <p className={props}></p>
                <p className={props}>Total</p>
                <p className={props}>{format_Price(price)}</p>
            </div>
        </div>
    );
};

export { Details_Order };