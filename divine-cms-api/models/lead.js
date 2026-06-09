export default (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    "Lead",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      websiteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceNeeded: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "leads",
      timestamps: true,
    }
  );

  Lead.associate = (models) => {
    Lead.belongsTo(models.Business, {
      foreignKey: "businessId",
      as: "business",
    });
  };

  return Lead;
};
