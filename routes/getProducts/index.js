const express = require('express');
const router = express.Router();
const { getAllProducts, insertProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../../controller/Products');

router.get('/', getAllProducts);
router.post('/', insertProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:category', getProductsByCategory);


module.exports = router;