import styles from './Billing Details.module.css'
import { useState, useEffect } from 'react';
import validations from '../../../../functions/validations';


const BillingDetails = ({ userData, setUserData }) => {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const rules = {
            name: { type: 'string', required: true },
            lastname: { type: 'string', required: true },
            mail: { type: 'string', required: true },
        };

        const validationErrors = validations(userData, rules);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        };
    }, [userData]);

    const handleChange = ({ target: { name, value } }) => {
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div className={styles.billingDetailsForm}>
            <h4>DETALLES DE ENVÍO</h4>
            <div className={styles.nameAndLastname}>
                <div className={styles.labelAndInfo}>
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Ingresa tu nombre'
                        required
                        value={userData.name}
                        onChange={handleChange}
                        />
                </div>
                <div className={styles.labelAndInfo}>
                    {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
                    <label htmlFor='lastname'>Apellidos</label>
                    <input
                        type='text'
                        name='lastname'
                        placeholder='Ingresa tus apellidos'
                        required
                        value={userData.lastname}
                        onChange={handleChange}
                        />
                </div>
            </div>
            <div className={styles.labelAndInfo}>
                {errors.mail && <p className={styles.error}>{errors.mail}</p>}
                <label htmlFor='mail'>Correo Electrónico</label>
                <input
                    type='text'
                    name='mail'
                    placeholder='Ingresa tu correo electrónico'
                    required
                    value={userData.mail}
                    onChange={handleChange}
                    id='form-checkout__email'
                />
            </div>
        </div>
    );
};

export default BillingDetails;