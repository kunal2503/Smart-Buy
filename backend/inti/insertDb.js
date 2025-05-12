const mongoose = require("mongoose");
const data = require("./sampleData")
const Product = require("../models/product")



const initDB = async () => {
  await Product.deleteMany({});
//   Data.data = Data.map((obj) => ({ ...obj, owner: "67d128bd5128405f57bf0282" }));
  await Product.insertMany(Data.data);
  console.log("Data was initialized");
};

initDB();