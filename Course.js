module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'courses',
    timestamps: false,
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Category, { foreignKey: 'category_id' });
    Course.hasMany(models.Instructor, { foreignKey: 'course_id' });
    Course.hasMany(models.Enrollment, { foreignKey: 'course_id' });
  };

  return Course;
};
