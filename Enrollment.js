module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    course_id: {
      type: DataTypes.INTEGER,
    },
    enrollment_date: {
      type: DataTypes.DATE,
    },
    completion_status: {
      type: DataTypes.STRING(20),
    },
  }, {
    tableName: 'enrollments',
    timestamps: false,
  });

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.User, { foreignKey: 'user_id' });
    Enrollment.belongsTo(models.Course, { foreignKey: 'course_id' });
  };

  return Enrollment;
};
