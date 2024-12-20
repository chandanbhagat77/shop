const express = require('express');
const { createProduct, uploadImages, resizeImage, editProduct, getAllOrdersForShipment, confirmShipemntForOrder, resizeToolImage, createCategory, updateCategory, updateSlider, getAllMyTools, actionOnTool, deletTool, addOtherSimillarColorProduct, deleteProduct, createBuisnessCategory, getAllBusinessList } = require('../Controllers/adminController');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const giveAccess = require('../Middleware/giveAccessTo');
const { getToolById, getToolByIdForMange } = require('../Controllers/toolControllers');
const adminRouter = express.Router()





adminRouter.get("/getAllMyTools", getAllMyTools)
adminRouter.get("/getToolById/:toolId", getToolById)

adminRouter.get("/getAllBusinessCategorysList", getAllBusinessList)


adminRouter.use(isLoggedIn, giveAccess("ADMIN"))
adminRouter.post("/create", uploadImages, resizeImage, createProduct)
adminRouter.patch("/edit/:productId", editProduct)
adminRouter.post("/delete", deleteProduct)

// to add category
adminRouter.post("/createBuisnessCategory",uploadImages, resizeToolImage,createBuisnessCategory)

// add colors simillar product to product

adminRouter.patch("/addColors", addOtherSimillarColorProduct)


adminRouter.get("/confirmShipment/:productId", confirmShipemntForOrder)
adminRouter.get("/getAllOrdersForShipment", getAllOrdersForShipment)

// add and remove of pproduct from the category
adminRouter.patch("/actionOnTool", actionOnTool)
adminRouter.delete("/actionOnTool/:toolId", deletTool)



// for frontend 
adminRouter.post("/createCategory", uploadImages, resizeToolImage, createCategory)
adminRouter.get("/getToolByIdManage/:toolId", getToolByIdForMange)


/*
to be added later
should get list of unordred product / not refunded 
should get list of returned product 
list of denger(to get over) product (with size) with action btn 
list of product 
*/




module.exports = adminRouter;




