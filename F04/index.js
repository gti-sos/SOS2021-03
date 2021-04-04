var express = require("express");

var PORT = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var app = express();

app.use(express.json());

app.use("/", express.static("./public"));

var inter_tourisms_initial = [
    {
        "country":"portugal",
        "year":2014,
        "number-of-arribals":10497000,
        "number-of-departures":1502000,
        "expenditures-billion":5213 
    },
    {
        "country":"francia",
        "year":2014,
        "number-of-arribals":206599000,
        "number-of-departures":31941000,
        "expenditures-billion":58464
    }
];

var inter_tourisms = inter_tourisms_initial;

app.get(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    res.send(JSON.stringify(inter_tourisms,null,2)); //pasar objeto a JSON
});

app.get(BASE_API_PATH+"/international-tourisms/loadInitialData",(req,res)=>{
    res.send(JSON.stringify(inter_tourisms_initial,null,2)); //pasar objeto a JSON

});
app.post(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    var newCountry = req.body;
    console.log("new country to be added: "+ JSON.stringify(newCountry,null,2));
    inter_tourisms.push(newCountry);
    res.sendStatus(201); 
});
//no me sale
app.delete(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    inter_tourisms.remove(); 
    res.send(JSON.stringify(inter_tourisms,null,2));
    res.sendStatus(204); 
});
//no me sale
app.get(BASE_API_PATH+"international-tourisms/francia",(req, res)=>{
    for(i=0; i < inter_tourisms.length; i++){
        if("francia" == inter_tourisms.country){
            res.send(JSON.stringify(inter_tourisms.country, null, 2));
        }
    }
});
//no me sale
app.delete(BASE_API_PATH+"/international-tourisms/portugal/2012",(req, res)=>{
    res.sendStatus(204)
});

//no me sale
app.put(BASE_API_PATH+"international-tourisms/portugal/2014",(req, res)=>{

});

app.put(BASE_API_PATH+"international-tourisms",(req, res)=>{
    res.sendStatus(405)
});

app.post(BASE_API_PATH+"international-tourisms/francia",(req, res)=>{
    res.sendStatus(405)
});

app.listen(PORT, () => {
	console.log("Server ready at port " + PORT +"!");
})