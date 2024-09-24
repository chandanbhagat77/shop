const Tool = require("../Models/Tools");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getNevigationListItems = catchAsync(async (req, res, next) => {
    const { gender } = req.params;

    let tool = await Tool.find({
        gender,
        $or: [
            { name: "CATEGORY" },
            { name: "X-MULTIPLE" },
            { name: "POSTER" }
        ]
    }).select("label _id name")

    let tool2 = await Tool.find({
        gender,
        $or: [
            { name: "CARDS" },
            { name: "Trending" },
        ]
    }).select("products name").populate([
        {
            path: "products",
            select: "_id name "
        }
    ])



    let category = []
    let poster = []
    let card = []
    let trend = []
    let multiple = []
    tool2.map((el) => {
        switch (el.name) {
            case "Trending":
                trend = el.products.map(item => {


                    let i = { id: item._id, name: item.name }
                    return i
                })
                break;

            case "CARDS":
                card = el.products.map(item => {
                    let i = { id: item._id, name: item.name }
                    return i
                })
                break;
            default:
                break;
        }
    })


    tool.map((el) => {
        switch (el.name) {
            case "CATEGORY":
                category.push({ id: el._id, name: el.label })
                break;
            case "X-MULTIPLE":
                multiple.push({ id: el._id, name: el.label })
                break;
            case "POSTER":
                poster.push({ id: el._id, name: el.label })
                break;



            default:
                break;
        }
    })


    let categories = [
        {
            name: "Category",
            subItems: category,
        },

        {
            name: "Multiple",
            subItems: multiple,
        },
        {
            name: "Trending",
            subItems: trend,
        },
        {
            name: "Top Products",
            subItems: card,
        },
        {
            name: "Thinking",
            subItems: poster,
        },
    ];




    res.status(200).send({
        status: "success",
        categories
    })












})
exports.getToolById = catchAsync(async (req, res, next) => {
    const toolId = req.params.toolId;
    const features = new Apifeature(Tool.find({ _id: toolId }), req.query).populate().filter().sort().fields().pagination();


    const products = await features.query;



    res.status(200).send({
        status: "success",
        products: products[0]?.products
    })
})



exports.getTools = catchAsync(async (req, res, next) => {
    const tool = req.params.tool;
    const features = new Apifeature(Tool.find({ name: tool }), req.query).populate().filter().sort().fields().pagination();


    const products = await features.query;

    console.log(products);

    res.status(200).send({
        status: "success",
        products: products
    })




})













