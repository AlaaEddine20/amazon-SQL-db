module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      required: true,
    },
    rate: {
      type: DataTypes.INTEGER(5),
      required: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product);
  };
  return Review;
};
