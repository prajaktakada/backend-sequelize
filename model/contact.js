module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      permanent_address: {  // ✅ fixed spelling
        type: DataTypes.STRING,
      },
      current_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "contacts", // optional: makes table name pluralized properly
      timestamps: true,      // adds createdAt & updatedAt by default
    }
  );

  return Contact; // ✅ return the model you just created
};
