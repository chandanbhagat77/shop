const BusinessCategory = require("../Models/BusinessCategory");
const catchAsync = require("../utils/catchAsync");


exports.getAllBusinessCategory = catchAsync(async(req,res,next)=>{

    const category= await BusinessCategory.find();


    res.status(200).send({
        status : "success",
        data : category
    })
})




















