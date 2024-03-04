const addProduct = async (cart, product, props) => {
    try {
        const result = await cart.addProduct(product, props);
        
        if (!result || result.length === 0) return { error: 'Error al agregar el producto al carrito' };

        return result
    } catch (error) {
        return error.message;
    };
};

module.exports = { addProduct };