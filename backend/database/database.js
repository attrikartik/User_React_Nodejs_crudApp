const Sequellize = require("sequelize");

const sequelize = new Sequellize('users','root','password',{
    dialect:'mysql',
    host:'localhost'
});
module.exports = sequelize;