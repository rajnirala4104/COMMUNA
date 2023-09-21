const mongoose = require("mongoose");
const color = require("colors");

const connectDatabase = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log(
         `mongo has connected - ${connection.connection.host}`.blue.underline
      );
   } catch (e) {
      console.log(`Oops!! something went wron - ${e.message}`.red.underline);
      process.exit();
   }
};

module.exports = connectDatabase;
