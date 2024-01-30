import { form, nameAndLastname, prop } from './Form Billing Details.module.css'

const Form_Billing_Details = ({ userData, setUserData }) => {
    const handleChange = ({ target: { name, value } }) => {
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div className={form}>
            <h3>Detalles de facturación</h3>
            <div className={nameAndLastname}>
                <div className={prop}>
                    <label htmlFor="name"> Nombre </label>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                </div>
                <div className={prop}>
                    <label htmlFor="lastname"> Apellidos </label>
                    <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
                </div>
            </div>
            <div className={prop}>
                <label htmlFor="mail"> Correo electrónico </label>
                <input type="text" name="mail" value={userData.mail} onChange={handleChange} />
            </div>
        </div>
    );
};

export { Form_Billing_Details };