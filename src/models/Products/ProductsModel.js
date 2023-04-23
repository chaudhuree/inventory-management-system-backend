const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
    {
        UserEmail: { type: String },
        CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        BrandID: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
        Name: { type: String },
        Unit: { type: String },
        Details: { type: String },
        CreatedDate: { type: Date, default: Date.now() },
    },
    { versionKey: false }
);
const ProductsModel = mongoose.model("products", DataSchema);
module.exports = ProductsModel;
