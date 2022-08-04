const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.STRING(3),
      primaryKey:true,
      allowNull:false,
    },
    img:{
      type : DataTypes.STRING, //Text
      allowNull:false,
    },
    continents:{
      type: DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.FLOAT,
    },
    population:{
      type: DataTypes.INTEGER,
    },
    maps:{
      type:DataTypes.STRING
    }
  });
};
