


const express = require('express'); 
const cacheMiddleware = require('../Redis/cacheMiddleware');
const { getAllBusinessCategory, getCategoryById, getBusinessCategoryFilterList } = require('../Controllers/businessCategoryController');
const businessCategoryRouter = express.Router()

businessCategoryRouter.get("/getHomepageCategory",getAllBusinessCategory)
businessCategoryRouter.get("/getBusinessCategoryFilterList/:businessId",getBusinessCategoryFilterList)
businessCategoryRouter.get("/getCategoryById/:toolId", getCategoryById)


module.exports = businessCategoryRouter;






















