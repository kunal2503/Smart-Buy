const mongoose = require("mongoose");
const Product = require('../models/product');

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/smart_Buy";
async function connect() {
  await mongoose.connect(MONGOOSE_URL);
}
connect()
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(() => {
    console.log("Faild to connect to DB");
  });


    const newProduct ={
      name: "Cool T-Shirt",
      price: 20,
      imageUrl: "https://example.com/tshirt.png",
      description: "A very cool t-shirt.",
      category: "Clothing",
    };

    const initDB = async () => {
      // await Product.deleteMany({});
    //   Data.data = Data.map((obj) => ({ ...obj, owner: "67d128bd5128405f57bf0282" }));
      await Product.insertMany({
        name: "Cool T-Shirt 3",
      price: 20,
      imageUrl: "https://example.com/tshirt.png",
      description: "A cool t-shirt.",
      category: "Clothing",
      });
      console.log("Data was initialized");
    };

    initDB();
    //  Product.insertMany(newProduct);
    // console.log('Product Created!');
  // } catch (error) {
    // console.error(error);
  // }
// };

// createProduct();
