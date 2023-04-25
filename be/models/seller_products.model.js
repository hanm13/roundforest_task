module.exports = mongoose => {
    const seller_products = mongoose.model(
      "seller_products",
      mongoose.Schema(
        {
          ASIN: String,
          Locale: String,
          Seller_name: String,
          Availability: Boolean,
          Price: Number,
          Product_name: String,
          Product_link: String,
        },
        { timestamps: true }
      )
    );
  
    return seller_products;
  };