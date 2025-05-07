const Product = require('./models/Product');

const createProduct = async () => {
  try {
    const newProduct = new Product({
      name: "Cool T-Shirt",
      price: 20,
      imageUrl: "https://example.com/tshirt.png",
      description: "A very cool t-shirt.",
      category: "Clothing",
    });

    await newProduct.save();
    console.log('Product Created!');
  } catch (error) {
    console.error(error);
  }
};

createProduct();
