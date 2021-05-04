const express = require("express");

const router = express.Router();
const { authenticated } = require("../middleware/auth");
const { textSanitaze } = require("../middleware/textSanitaze");
const { uploadFile } = require("../middleware/uploadimage");
const { checkRolePartner, checkRoleUser } = require("../middleware/checkRole");

// user
const { register, login, checkAuth } = require("../controllers/auth");
const {
	getUsers,
	getDetailUser,
	updateUser,
	deleteUser,
} = require("../controllers/user");

// restaurant
const {
	getRestaurants,
	getRestaurant,
	createRestaurant,
	updateRestaurant,
	getDetailRestaurant,
	getRestaurantFav,
} = require("../controllers/resaturant");

// product
const {
	getProducts,
	getDetailProduct,
	getProductsRestaurant,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/product");
//transaction
const {
	getTransactions,
	getDetailTransaction,
	createTransaction,
	getUserTransactions,
	getRestaurantTransactions,
	updatIsRead,
	editTransaction,
	getTest,
} = require("../controllers/transaction");

// link
// Auth
router.post("/login", textSanitaze, login);
router.post("/register", textSanitaze, register);
router.get("/check-auth", authenticated, checkAuth);

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

// restaurant
router.get("/restaurants-fav", getRestaurantFav);
router.get("/restaurants", getRestaurants);
router.get("/restaurant", authenticated, getRestaurant);
router.get("/restaurant/:id", authenticated, getDetailRestaurant);
router.post(
	"/restaurant",
	authenticated,
	uploadFile("imageFile", "profile"),
	createRestaurant
);
router.patch(
	"/restaurant",
	authenticated,
	uploadFile("imageFile", "profile"),
	updateRestaurant
);

//product
router.get("/products", authenticated, getProducts);
//atau  restoran detail
router.get("/products/:id", authenticated, getProductsRestaurant);
router.get("/product/:id", authenticated, getDetailProduct);
router.post(
	"/product",
	authenticated,
	uploadFile("imageFile", "product"),
	createProduct
);
router.patch(
	"/product/:id",
	authenticated,
	uploadFile("imageFile", "product"),
	updateProduct
);
router.delete("/product/:id", authenticated, deleteProduct);

// // transaction
router.post("/transaction", authenticated, createTransaction);
router.get("/transaction/:id", authenticated, getDetailTransaction);
router.get("/transactions", authenticated, getTransactions);
router.get(
	"/transactions/restaurant",
	authenticated,
	getRestaurantTransactions
);
router.get("/transactions/user", authenticated, getUserTransactions);
router.put("/transaction/:id", authenticated, editTransaction);
router.put("/isread/:id", authenticated, updatIsRead);
// router.put("/transactions/user/:id", authenticated, getUserTransactions);
// router.put("/transactions/restaurant/:id", authenticated, getUserTransactions);
// router.get("/test", authenticated, getTest);

module.exports = router;
