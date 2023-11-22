const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/productModel");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect(
		"mongodb+srv://K0ruru:Obiwan13@kyuudtbs.b5sii4r.mongodb.net/Products?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(3000, () => {
			console.log(`Node API is running on http://localhost:${3000}`);
		});
	})
	.catch((e) => {
		console.log(e);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/../frontend"));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// routes
app.get("/products/:id", async (req, res) => {
	try {
		const productId = req.params.id; // Extract the product ID from the URL parameter
		if (!ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		console.error("Error fetching product:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/products", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/products", async (req, res) => {
	try {
		const {
			name,
			type,
			price,
			quantity,
			imageSrc,
			description,
			specifications,
		} = req.body;

		// Create a new Product object using the received form data
		const newProduct = new Product({
			name,
			type,
			price,
			quantity,
			imageSrc,
			description,
			specifications: specifications.split(","), // If specifications are comma-separated
			// Map other fields as needed based on your schema
		});

		// Save the new product to the database
		const product = await newProduct.save();

		res.status(200).json(product);
	} catch (e) {
		console.log(e.message);
		res.status(500).json({ message: e.message });
	}
});

app.delete("/products/:id", async (req, res) => {
	try {
		const productId = req.params.id;

		// Validate the provided product ID
		if (!ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		// Attempt to find and delete the product by its ID
		const deletedProduct = await Product.findByIdAndDelete(productId);

		if (!deletedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.json({ message: "Product deleted successfully", deletedProduct });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});
