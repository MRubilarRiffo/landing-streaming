const format_Price = (price) => {
    const priceCLP = Math.floor(price);
    return `$${priceCLP.toLocaleString('es-CL')}`;
};

export { format_Price };