const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());


// categoryconfig
const CategoriesRouter = require('./routes/categories');
app.use('/category', CategoriesRouter);
const Category = require('./models/category');

// userconfig
const UsersRouter = require('./routes/users');
app.use('/user', UsersRouter);
const User = require('./models/user');


// productconfig
const ProductsRouter = require('./routes/products');
app.use('/product', ProductsRouter);
const Product = require('./models/product');


// orderconfig
const OrdersRouter = require('./routes/orders');
app.use('/order', OrdersRouter);
const Order = require('./models/order');


// {
//     "name": "Rasp Pi",
//     "categorie": "carte electronique",
//     "description": "carte electronque wou barcha hajet okhrin",
//     "countInStock": 90,
//     "image": "urol",
//     "stockMin": 2,
//     "featured": true
// }

// {
//     "cin": 14256378,
//     "name": "samir ",
//     "lastName": "elpatron",
//     "classe": "GTE",
//     "email": "fares@abdelbeki.com",
//     "password": "pasword1",
//     "isAdmin": false
// }

mongoose.connect('mongodb+srv://fares:fares@cluster0.dnbtuea.mongodb.net/final-magasin?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'final-magasin'
})
    .then(() => {
        console.log('connection database is ready');
    })
    .catch((err) => {
        console.log(err);
    })




app.listen(4000, () => {
    console.log('serveur in running in http://localhost:4000');
})