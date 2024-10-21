


const express = require('express'); 
const cacheMiddleware = require('../Redis/cacheMiddleware');
const { getAllBusinessCategory } = require('../Controllers/businessCategoryController');
const businessCategoryRouter = express.Router()

businessCategoryRouter.get("/getHomepageCategory",getAllBusinessCategory)



module.exports = businessCategoryRouter;






















