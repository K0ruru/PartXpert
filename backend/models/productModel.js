const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: String,
		type: String,
		quantity: Number,
		price: Number,
		imageSrc: String,
		description: String,
		specifications: [String],
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
