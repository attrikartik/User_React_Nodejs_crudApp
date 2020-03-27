const Sequellize = require("sequelize");

const sequelize = require("../database/database");

const User = sequelize.define('user',{
    id:{
      type:Sequellize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },

    fullName:{
        type:Sequellize.STRING,
        allowNull:false
    },

    email:{
        type:Sequellize.STRING,
        allowNull:false
    },
    
    zipCode:{
        type:Sequellize.STRING,
        allowNull:false
    },

    message:{
        type:Sequellize.STRING,
        allowNull:false
    },
    
    
    country:{
        type:Sequellize.STRING,
        allowNull:false
    },
    
    gender:{
        type:Sequellize.STRING,
        allowNull:false
    }
});

module.exports = User;