const router = require("express").Router();
const { fetch_all_products } = require("./product-controller");

router.get("/fetch-products", fetch_all_products);

module.exports = router;
