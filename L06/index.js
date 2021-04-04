var express = require("express");

var PORT = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var app = express();

app.use(express.json());

app.use("/", express.static("./public"));

var contacts = [
    {
        "name":"pablo",
        "phone":12345
    },
    {
        "name":"pepe",
        "phone":6377
    }
];

app.get(BASE_API_PATH+"/contacts", (req,res)=>{
    res.send(JSON.stringify(contacts,null,2)); //pasar objeto a JSON
});

app.post(BASE_API_PATH+"/contacts", (req,res)=>{
    var newContact = req.body;
    console.log("new contact to be added: "+ JSON.stringify(newContact,null,2));
    contacts.push(newContact);
    res.sendStatus(201); 
});

app.listen(PORT, () => {
	console.log(`Server ready at port ${PORT}!`);
})