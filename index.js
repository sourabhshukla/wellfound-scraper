const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database");
dotenv.config();

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

connectDatabase();
