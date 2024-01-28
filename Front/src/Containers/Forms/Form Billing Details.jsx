const Form_Billing_Details = ({ userData, setUserData }) => {
    const handleChange = ({ target: { name, value } }) => {
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div>
            <div>
                <label htmlFor="name"> Nombre </label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="lastname"> Apellidos </label>
                <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="mail"> Correo electrónico </label>
                <input type="text" name="mail" value={userData.mail} onChange={handleChange} />
            </div>
        </div>
    );
};

export { Form_Billing_Details };