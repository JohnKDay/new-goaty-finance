const sequelize = require('sequelize');

var Schema = sequelize.Model;

var stockSchema = new Schema({
  stockName: String
});

module.exports = sequelize.Model('stockModel', stockSchema);
