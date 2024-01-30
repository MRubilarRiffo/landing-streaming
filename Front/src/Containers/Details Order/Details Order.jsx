import { format_Price } from '../../Functions/Format Price';
import { container, containerTitles } from './Details Order.module.css';

const Details_Order = ({ quantity, price, name }) => {
    
    const titles = ["Producto", "Cantidad", "Subtotal"];

    return (
        <div className={container}>
            <h3>Tu pedido</h3>
    
            <div className={containerTitles}>
                {titles.map(title => (
                    <h4 key={title}>{title}</h4>
                ))}
            </div>
            <div>
                <p>{name}</p>
                <p>{quantity}</p>
                <p>{format_Price(price * quantity)}</p>
            </div>
        </div>
    );
};

export { Details_Order };