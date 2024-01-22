import { containerImg } from './Details Img.module.css'

const Details_Img = ({ image }) => {
    return (
        <div className={containerImg}>
                <img
                    src={image}
                    alt='Imagen de producto'
                    />
            </div>
    );
};

export { Details_Img };