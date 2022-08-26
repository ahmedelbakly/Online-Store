const express = require("express");
const app = express();
const dbUri = "mongodb://localhost:27017/online-Store";
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var flash = require('connect-flash');

const port = 4000;
const path = require("path");
const cors = require("cors");
const homeRouter = require("./routes/homeRoute");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.router");
const cartRoutes = require("./routes/cart.route")
const orderRoutes = require("./routes/order.route")
const adminRoutes = require("./routes/admin.route")

var Store = new MongoDBStore({
  uri: dbUri,
  collection: "mySessions",
});

// Catch errors
Store.on("error", function (error) {
  console.log(error);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

app.use(flash());
app.use(
  require("express-session")({
    secret: "This is a secret adgiollc..c.c...nhchhdnbdchchfc",
    saveUninitialized:false,
    cookie: {
      //maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: Store,
    resave: true
  })
);

app.set("view engine", "ejs");
//app.set('views', "views")
app.use("/", homeRouter);
app.use("/product", productRouter);
app.use("/", authRouter);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/admin", adminRoutes);


// mongoose.connect(dbUri).then(()=>{
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// })
