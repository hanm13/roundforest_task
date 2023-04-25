module.exports = mongoose => {
    const seller_products = mongoose.model(
      "seller_products",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean,
          ASIN: String,
          Locale: String,
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