module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    instructor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instructor_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'instructors',
    timestamps: false,
  });

  Instructor.associate = (models) => {
    Instructor.belongsTo(models.Course, { foreignKey: 'course_id' });
  };

  return Instructor;
};
