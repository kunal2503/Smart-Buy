const express = require('express');
const router = express.Router();
const Product = require('../models/product');


exports.addProduct = async (req, res) => {
     try{
            const {name , price , description, imageUrl, category} = req.body;
    
            if(!name || !price || !description || !imageUrl || !category) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            const newProduct = new Product({
                name,
                price,
                description,
                imageUrl,
                category
            })
            await newProduct.save();
            return res.status(201).json({message: "Product added successfully", product : newProduct});
        } catch(err){
            console.error(err);
            return res.status(500).json({message: "Internal server error"});
        }
}

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({products});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.singleProduct = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({product});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}