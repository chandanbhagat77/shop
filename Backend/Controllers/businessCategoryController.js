const BusinessCategory = require("../Models/BusinessCategory");
const Tool = require("../Models/Tools");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const { ObjectId } = require('mongodb');

exports.getAllBusinessCategory = catchAsync(async(req,res,next)=>{

    const category= await BusinessCategory.find();


    res.status(200).send({
        status : "success",
        data : category
    })
})

exports.getNavbarData = catchAsync(async(req,res,next)=>{

    let category= await BusinessCategory.find({},"-products -__v");
    const innerset = await Tool.find({
        name : "CATEGORY"
    },"label coverImage businessCategory")
    
    // console.log(category,"inset",innerset);
    category=category.map(el=>{

        let add=innerset.filter(e=>e.businessCategory.toString() == el._id.toString())
        console.log(add);
        
        return {...el._doc,subCategory : add};
       
    })
console.log("updated",category);

    

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

exports.getBusinessCategoryFilterList = catchAsync(async (req,res,next)=>{

    const businessId = req.params.businessId;
    console.log(businessId);
    
    const data = await Tool.aggregate([
        {
            $match: {
              businessCategory: new ObjectId(businessId) // Use 'new' with ObjectId
            }
          },
          {
            $group: {
                _id: {
                    originalId: '$_id', // Preserve original _id
                    label: '$label'      // Group by label
                  },
              productCount: { $sum: { $size: "$products" } },
              
            }
          }
       
      ]);
      
    console.log("data is ",data);
    

    res.status(200).send({
        status : "success",
        data
    })
})




exports.getAnalytics = catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const data=await BusinessCategory.findById(id).select("products").populate("products","viewCount name ");
    console.log(data);
    
    const products = data.products
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);
    


    res.status(200).send(
        {
            status : "success",
            data : products
        }
    )
})












