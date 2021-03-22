const { Op } = require("sequelize")
const { Product, Order, Transaction, User } = require("../../models");

exports.getTransactions = async (req, res) => {
  const 
  try {
    const transactions = await Transaction.findAll({
      where: {
        partnerId: req.userId.id
      },
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullName", "location", "email"]
        },
        {
          model: Order,
          as: "order",
          attributes: [["product_id", "id"], "title", "price", "image", "qty"]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "partnerId"]
      }
    });

    res.status(200).send({
      status: "success",
      data: {
        transactions
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "error",
      message: "Internal Server Error"
    })
  }
};

exports.getDetailTransaction = async (req, res) => {
  const { params: { id }, user: { role } } = req;
  if (role === "user") return res.status(403).send({
    status: "error",
    message: "access denied"
  });

  try {
    const transaction = await Transaction.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullName", "location", "email"]
        },
        {
          model: Order,
          as: "order",
          attributes: [["product_id", "id"], "title", "price", "image", "qty"]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "customerId", "restaurantId"]
      }
    });
    res.status(200).send({
      status: "success",
      data: {
        transaction
      }
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error"
    })
  }
};



exports.createTransaction = async (req, res) => {
  const { body: { restaurant_id, products }, user } = req;
  const ids = products.map(product => product.id);
  const quantities = products.map(product => product.qty);
  try {

    const { id: transactionId } = await Transaction.create({
      "status": "Success",
      restaurantId: restaurant_id,
      customerId: user.id
    })

    const productData = await Product.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"]
      },
      raw: true
    })

    const order = await Order.bulkCreate(
      productData.map((product, idx) => ({
        transactionId,
        product_id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: quantities[idx]
      }))
    );

    // get created transaction
    const transaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullName", "location", "email"]
        },
        {
          model: Order,
          as: "order",
          attributes: [["product_id", "id"], "title", "price", "image", "qty"]
        }
      ],
      where: {
        id: transactionId
      },
      attributes: ["id", "status"]
    })

    res.status(200).send({
      status: "on the way",
      data: {
        transaction
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "error",
      message: "Internal Server Error"
    })
  }
};

exports.updateTransaction = async (req, res) => {
  const {
    body,
    params: { id },
    user: { role }
  } = req;
  if (role === "user") return res.status(403).send({
    status: "error",
    message: "access denied"
  });

  try {
    const success = await Transaction.update(body,
      {
        where: {
          id
        }
      }
    );

    const updatedTransaction = await Transaction.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullName", "location", "email"]
        },
        {
          model: Order,
          as: "order",
          attributes: [["product_id", "id"], "title", "price", "image", "qty"]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "customerId", "restaurantId"]
      }
    });
    res.status(200).send({
      status: "success",
      data: {
        transaction: updatedTransaction
      }
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "internal server error"
    })
  }
};


exports.deleteTransaction = async (req, res) => {
  const {
    params: { id },
    user: { role }
  } = req;

  if (role === "user") return res.status(403).send({
    status: "error",
    message: "access denied"
  })

  try {
    await Transaction.destroy({
      where: {
        id
      }
    })
    res.status(200).send({
      status: "success",
      data: {
        id
      }
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error"
    })
  }
};


exports.getCustomerTransactions = async (req, res) => {
  const { user: { id } } = req;
  try {
    const transactions = await Transaction.findAll({
      where: {
        customerId: id
      },
      include: [
        {
          model: Order,
          as: "order",
          attributes: [["product_id", "id"], "title", "price", "image", "qty"]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "customerId", "restaurantId"]
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        transactions
      }
    })

  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Internal Server Error"
    })
  }
}