const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
  description: String
});

module.exports= mongoose.Model("Category",categorySchema);