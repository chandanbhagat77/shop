


const express = require('express'); 
const cacheMiddleware = require('../Redis/cacheMiddleware');
const { getAllBusinessCategory, getCategoryById, getBusinessCategoryFilterList, getNavbarData, getAnalytics } = require('../Controllers/businessCategoryController');
const businessCategoryRouter = express.Router()

businessCategoryRouter.get("/getHomepageCategory",getAllBusinessCategory)
businessCategoryRouter.get("/getBusinessCategoryFilterList/:businessId",getBusinessCategoryFilterList)
businessCategoryRouter.get("/getCategoryById/:toolId", getCategoryById)
businessCategoryRouter.get("/getNavbarData", getNavbarData)
businessCategoryRouter.get("/getAnlytics/:id", getAnalytics)


module.exports = businessCategoryRouter;






















