const express = require("express");
const faker = require("faker")
const app = express();
const port = 8000;
const users = [];
const companies= [];
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


class User {
    constructor(){
        this.firstName= faker.name.firstName();
        this.lastName= faker.name.lastName();
        this.phoneNumber= faker.phone.phoneNumberFormat();
        this.email= faker.internet.email();
        this.password= faker.internet.password();
    }
}
class Company {
    constructor(){
        this.name= faker.company.companyName();
        this.address = {
            "street": `${faker.address.streetName()}`,
            "city": `${faker.address.city()}`,
            "state": `${faker.address.state()}`,
            "zipCode": `${faker.address.zipCode()}`,
            "country": `${faker.address.country()}`,
        }

        
    }
}

app.get("/", (req, res) => {
    res.json( {users, companies} );
});

app.post("/users/new", (req, res) => {
    // req.body will contain the form data from Postman or from React
    // we can push it into the users array for now...
    // later on this will be inserted into a database
    users.push({"id": users.length+1,...new User()});
    // we always need to respond with something
    res.json( { status: "ok" } );
});
// if we want to get a user with a specific id, we can make the id a part of the url
// be sure to preface the id variable with a `:` colon
app.get("/users/:id", (req, res) => {
    // we can get this `id` variable from req.params
    console.log(req.params.id);
    // assuming this id is the index of the users array we could return one user this way
    res.json( users[req.params.id] );
});
app.put("/users/edit/:id", (req, res) => {
    // we can get this `id` variable from req.paramscopy
    const id = req.params.id;
    // assuming this id is the index of the users array we can replace the user like so
    users[id] = req.body;
    // we always need to respond with something
    res.json( { status: "ok" } );
});
app.put("/users/delete/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const id = req.params.id;
    // assuming this id is the index of the users array we can remove the user like so
    users.splice(id, 1);
    // we always need to respond with something
    res.json( { status: "ok" } );
});

/////////////////////////////company//////////////////////////////////////

app.post ("/companies/new",(rep,res) => {
    companies.push({"id": companies.length+1,...new Company()});
    res.json( { status: "ok" } );
});

app.get ("/companies/:id", (req,res) => {
    res.json(companies[req.params.id]);
});

app.put ("/companies/edit/:id", (req,res) =>{
    companies[req.params.id]=req.body;
    res.json( { status: "edited" } );
});

app.put("/users/delete/:id", (req, res) => {
    const id = req.params.id;
    companies.splice(id, 1);
    res.json( { status: "deleted" } );
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );