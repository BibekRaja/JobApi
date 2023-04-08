const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const url = 'mongodb+srv://raja:12345@cluster0.p3jrmhd.mongodb.net/JobSearch'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected!'))
    .catch(err => console.log(err))