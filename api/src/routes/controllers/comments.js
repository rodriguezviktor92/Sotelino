require("dotenv").config;
const { Comment, Order } = require("../../db");
//const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      let getComment = await Comment.findAll({
        attributes: ["description", "orderIdOrder"],

        include: [
          {
            model: Order,

            attributes: ["id_order",
            "amount",
            "order_date",
            "order_status",
            "observation",
            "shipping_address",
            "customerIdCustomer"],
          },
        ],
        //         }
      });
      res.send(getComment);
    } catch (error) {
      console.log("Fail database connection");
    }
  },
};

//       User.findAll({
//         include: {
//             model: Address,
//             as: "domicilio",
//             attributes: ['street']
//         },
//         attributes: ['name', 'age']
//     }).then(users => res.json(users));
// });

/*const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Address = require('../database/models/Address');
      
     

const Post = require('./models/Post');
const Address = require('./models/Address');
const User = require('./models/User');

// Uno a uno

// Usuario tiene una direccion
// añadir una clave foranea userId a la tabla addresses
User.hasOne(Address, { as: "domicilio", foreignKey: "residente_id" });

// Añade una clave userId a la tabla addresses
Address.belongsTo(User, { as: "residente", foreignKey: "residente_id" });


const { Sequelize } = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
);

module.exports = sequelize;




      
      router.get('/', (req, res) => {
    User.findAll({
        include: {
            model: Address,
            as: "domicilio",
            attributes: ['street']
        },
        attributes: ['name', 'age']
    }).then(users => res.json(users));
});






*/


