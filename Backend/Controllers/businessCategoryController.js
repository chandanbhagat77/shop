const BusinessCategory = require("../Models/BusinessCategory");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");


exports.getAllBusinessCategory = catchAsync(async(req,res,next)=>{

    const category= await BusinessCategory.find();


    res.status(200).send({
        status : "success",
        data : category
    })
})
exports.getCategoryById = catchAsync(async (req, res, next) => {
    const toolId = req.params.toolId;




    const features = new Apifeature(BusinessCategory.find({ _id: toolId }), req.query).populate().filter().sort().fields().pagination();


    const products = await features.query;


    // await createCache(req, {
    //     status: "success",
    //     products: products[0]?.products
    // })


    res.status(200).send({
        status: "success",
        products: products[0]?.products
    })
})

















