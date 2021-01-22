module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    brand: {
      type: DataTypes.STRING,
      required: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Product.associate = (models) => {
    Product.hasMany(models.Review);
  };
  return Product;
};
