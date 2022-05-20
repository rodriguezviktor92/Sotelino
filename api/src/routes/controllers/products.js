require("dotenv").config;
const { Product, Category } = require("../../db");
const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    try {
      const getProducts = async (query) => {
        return await Product.findAndCountAll(query);
      };

      const query = {
        where: {
          state: "Available",
        },
        attributes: [
          "id_product",
          "serie",
          "name",
          "description",
          "technique",
          "measures",
          "image",
          "price",
          "sku",
          "released",
          "state",
        ],
        limit: 3,
        offset: page * 3,
        include: [
          {
            model: Category,
            attributes: ["id_category", "name"],
            through: {
              attributes: [],
            },
          },
        ],
      };
      if (req.query.name) {
        const { name } = req.query;
        console.log("name: ", name);
        query.where.name = {
          [Op.iLike]: `%${name.toLowerCase()}%`,
        };
      }
      if (req.query.category && req.query.category !== "0") {
        const { category } = req.query;

        query.include[0].where = {
          id_category: category,
        };
      }
      const products = await getProducts(query);
      res.send({
        totalPages: Math.ceil(products.count / 3),
        content: products.rows,
      });
    } catch (err) {
      res.send(err);
    }
  },
};
