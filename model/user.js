module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      createdAt: {                  // ✅ default timestamp
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {                  // ✅ also needed if timestamps = true
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users", // optional: ensures pluralization
      timestamps: true,   // auto-manages createdAt & updatedAt if you don’t override
    }
  );

  return User;
};
