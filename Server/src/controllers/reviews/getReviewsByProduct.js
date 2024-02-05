const { getReviewsByProduct_h } = require("../../handlers/reviews/getReviewsByProduct_h,js");

const getReviewsByProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const reviews = await getReviewsByProduct_h(id);

        if (reviews.error) res.status(400).send(reviews.error);
        else res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reviews' });
    };
};

module.exports = { getReviewsByProduct };