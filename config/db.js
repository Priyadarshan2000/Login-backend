require('dotenv').config();
const mongoose = require('mongoose');

const url = "mongodb+srv://userdata:pass@userdata.y4wjv.mongodb.net/userdata?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => { 
    console.log('MongoDB Connected');

    console.log('Connected to MongoDB');
}).catch((err) => console.log(err));