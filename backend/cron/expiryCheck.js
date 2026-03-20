const cron = require('node-cron');
const ProductDetail = require('../models/ProductDetail');

cron.schedule('0 0 * * *', async () => {
   const foods = await ProductDetail.find();

   foods.forEach(async (food) => {
      const today = new Date();
      const expiry = new Date(food.expiryDate);

      const diff = (expiry - today) / (1000 * 60 * 60 * 24);

      // Only update expiryState label.
      // Do NOT disturb pickup flow statuses (available/reserved/collected).
      if (diff <= 1 && diff > 0) {
         food.expiryState = "Near Expiry";
      } else if (diff <= 0) {
         food.expiryState = "Expired";
      } else {
         food.expiryState = "Fresh";
      }

      await food.save();
   });

   console.log("Expiry check completed");
});