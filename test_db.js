const mongoose = require("mongoose");
const Food = require("./backend/models/Food");
const User = require("./backend/models/User");
require("dotenv").config({ path: "./backend/.env" });

async function verify() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodvalue");
  
  const foods = await Food.find({ status: "reserved" }).lean();
  console.log(`Found ${foods.length} reserved foods in DB.`);
  
  if (foods.length > 0) {
    for (const f of foods) {
      console.log(`- Food ID: ${f._id}, Name: ${f.name}, ReservedBy: ${f.reservedBy}`);
      
      // Test the exact $or query the endpoint uses
      const testQuery = await Food.find({
        $or: [
          { collectedBy: String(f.reservedBy), status: "collected" },
          { reservedBy: String(f.reservedBy), status: "reserved" }
        ]
      }).lean();
      
      console.log(`  -> Endpoint query result length for this user: ${testQuery.length}`);
      if (testQuery.length === 0) {
         console.log(`  -> [ERROR] Mongoose didn't match the string cast mapping!`);
      }
    }
  }
  
  process.exit(0);
}

verify().catch(console.error);
