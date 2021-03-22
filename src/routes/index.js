const express = require("express");

const router = express.Router();
const { authenticated } = require("../middleware/auth");
const { textSanitaze } = require("../middleware/textSanitaze");
// const { uploadFile } = require("../middleware/upload");
const { uploadFile } = require("../middleware/uploadimage");
const { checkRolePartner, checkRoleUser } = require("../middleware/checkRole");

// user
const { register, login } = require("../controllers/auth");
const {
	getUsers,
	getDetailUser,
	updateUser,
	deleteUser,
} = require("../controllers/user");

// product
const {
	getProducts,
	getProductsUser,
	getDetailProduct,
	createProduct,
	updateProduct,
	getProductsPartnerLogin,
	getProductFav,
} = require("../controllers/product");
//transaction
const {
	getTransactionStore,
	getDetailTransaction,
	getTest,
	createTransaction,
} = require("../controllers/transaction");

// link
// Loginregister
router.post("/login", textSanitaze, uploadFile("imageFile"), login);
router.post("/register", textSanitaze, register);

// Users
router.get("/users", authenticated, getUsers);
router.get("/user", authenticated, getDetailUser);
router.patch(
	"/user/update",
	authenticated,
	uploadFile("imageFile", "profile"),
	updateUser
);
router.delete("/user/:id", authenticated, deleteUser);

// Product
router.get("/store", authenticated, checkRolePartner, getProductsPartnerLogin);
router.get("/store/fav", authenticated, getProductFav);
router.get("/products", authenticated, getProducts);
router.get("/products/:id", authenticated, getProductsUser);
router.get("/product/:id", authenticated, getDetailProduct);
router.patch(
	"/product/:id",
	authenticated,
	uploadFile("imageFile", "product"),
	updateProduct
);
router.post(
	"/product",
	authenticated,
	checkRolePartner,
	uploadFile("imageFile", "product"),
	createProduct
);

// transaction
// router.get("/transaction/", authenticated, getTransactionStore);
router.get("/transaction/:id", authenticated, getDetailTransaction);
router.get("/test", authenticated, getTest);
router.post("/transaction", authenticated, createTransaction);

module.exports = router;
