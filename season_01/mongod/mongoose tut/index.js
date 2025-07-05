// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    //   await mongoose.connect('mongodb://localhost/sumitkart');


    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connectections established");
});

var kittySchema = new mongoose.Schema({
    name: String
})

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? 'My name is ' + this.name : 'I don\'t have a name';
    console.log(greeting);
};

// const Kitten = mongoose.model('Kitten', kittySchema);

var kitten = mongoose.model('sumitkitty', kittySchema);

var sumitkitty = new kitten({ name: 'sumitkitty' });
var sumitkitty2 = new kitten({ name: 'sumitkitty' });
// console.log(sumitkitty.name);

// sumitkitty.speak();

// sumitkitty.save(function (err, sumitkitty) {
//     if (err) return console.error(err);
//     sumitkitty.speak();
// });
// sumitkitty2.save(function (err, r) {
//     if (err) return console.error(err);
//     r.speak();
// });

// sumitkitty.save()
//     .then(() => sumitkitty.speak())
//     .catch(error => console.error(error));

await sumitkitty.save();
sumitkitty.speak();

await sumitkitty2.save();
sumitkitty2.speak();

