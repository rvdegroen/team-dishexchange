const { MongoClient } = require("mongodb");

// CONNECT DATABASE
 const connectDB = async () => {

    const url = 
		"mongodb+srv://" +
		process.env.DB_USER +
		":" +
		process.env.DB_PASS +
		"@" +
		process.env.DB_HOST +
		"/" +
		process.env.DB_NAME +
		"?retryWrites=true&w=majority";

        // new client mongodb
const client = new MongoClient(url);

  // Connect the client to url that"s saved in .env file
  await client.connect();
  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
  // Variable of the database dish-exchange
  database = client.db(process.env.DB_NAME);
  // Variable of dishes collection within dish-exchange
  dishesCollection = database.collection("dishes");
  userCollection = database.collection("users");
}


module.exports = connectDB;