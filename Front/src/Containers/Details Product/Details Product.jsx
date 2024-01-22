import { useEffect, useRef, useState } from 'react';
import { background, containerDetails } from './Details Product.module.css'
import { Details_Img } from './Details Img/Details Img';
import { Close_Button } from './Close Button/Close Button';
import { Details_Props } from './Details Props/Details Props';
import { Pay } from '../Pay/Pay';

const Details_Product = ({ props, setOnDetails }) => {
    const containerDetailsRef = useRef(null);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    const handleBackgroundClick = ({ target }) => {
        if (containerDetailsRef.current && !containerDetailsRef.current.contains(target)) {
            handleClose();
        };
    };
    
    const handleClose = () => setOnDetails(false);

    const priceBulk = props.meta_data.find(item => item.key === 'o-discount')?.value || null;

    const [modePay, setModePay] = useState(false);

    return (
        <div
            className={background}
            onClick={handleBackgroundClick}
            >
            <div
            className={containerDetails}
            ref={containerDetailsRef}
            >
                <Close_Button handleClose={handleClose} />
                {!modePay
                    ? <>
                        <Details_Img image={props.images[0].src} />
                        <Details_Props
                            name={props.name}
                            category={props.categories[0].name}
                            price={props.price}
                            regularPrice={props.regular_price}
                            description={props.description}
                            priceBulk={priceBulk}
                            handleClose={handleClose}
                            setModePay={setModePay}
                        />
                    </>
                    : <Pay />
                }
                
            </div>
        </div>
    );
};

export { Details_Product };