module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Course, { foreignKey: 'category_id' });
  };

  return Category;
};
