import { buttonClose } from './Close Button.module.css';

const Close_Button = ({ handleClose }) => {
    return (
        <button
            className={buttonClose}
            name='buttonClose'
            onClick={handleClose}
            >
            x
        </button>
    )
}

export { Close_Button };