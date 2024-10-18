

const mongoose = require('mongoose');

const businessCategory = new mongoose.Schema(({
    name: {
        type: String,

        required: [true, "must provide type of tool you are creating"]
    },
    products: {
        type: [mongoose.mongo.ObjectId],
        ref: "Product"
    },
    coverImage : {
        type : String
    }
    
   
    
   
}))

const BusinessCategory = mongoose.model("BusinessCategory", businessCategory)

module.exports = BusinessCategory




































