import { form, nameAndLastname, containerInput } from './Form Billing Details.module.css'

const Form_Billing_Details = ({ userData, setUserData }) => {
    const handleChange = ({ target: { name, value } }) => {
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div className={form}>
            <h4>DETALLES DE FACTURACIÓN</h4>
            <div className={nameAndLastname}>
                <div className={containerInput}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Nombre *'
                        required
                        value={userData.name}
                        onChange={handleChange}
                        />
                </div>
                <div className={containerInput}>
                    <input
                        type='text'
                        name='lastname'
                        placeholder='Apellidos *'
                        required
                        value={userData.lastname}
                        onChange={handleChange}
                        />
                </div>
            </div>
            <div className={containerInput}>
                <input
                    type='text'
                    name='mail'
                    placeholder='Correo Electrónico *'
                    required
                    value={userData.mail}
                    onChange={handleChange}
                    />
            </div>
        </div>
    );
};

export { Form_Billing_Details };