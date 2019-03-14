const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
    {
        id: Number,
        message: String,
    },
    {
        timestamps: true
    }
);

module.exports= mongoose.model('Model', modelSchema)