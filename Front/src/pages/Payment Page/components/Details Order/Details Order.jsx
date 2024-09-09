import formatPrice from '../../../../functions/formatPrice';
import { line, detailsOrder, containerProps, props } from './Details Order.module.css';

const DetailsOrder = ({ quantity, salePrice, name, subTotal }) => {
    console.log(salePrice);
    
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
                <p className={props}>{formatPrice(salePrice * quantity, 'Chile')}</p>
            </div>
            <div className={line}></div>
            <div className={containerProps}>
                <p className={props}></p>
                <p className={props}>Total</p>
                <p className={props}>{formatPrice(salePrice, 'Chile')}</p>
            </div>
        </div>
    );
};

export default DetailsOrder;