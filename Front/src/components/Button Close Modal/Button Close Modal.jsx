import styles from './Button Close Modal.module.css';
import { RiCloseFill } from 'react-icons/ri';

const ButtonCloseModal = ({ setCloseModal }) => {
    const handle = {
        closePurchaseOptions: () => setCloseModal(false),
    };

    const { closePurchaseOptions } = handle;
    const { closeBtn } = styles;

    return (
        <button
            className={closeBtn}
            onClick={closePurchaseOptions}
        >
            <RiCloseFill />
        </button>
    );
};

export default ButtonCloseModal;