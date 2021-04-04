var express = require("express");

var PORT = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var app = express();

app.use(express.json());

app.use("/", express.static("./public"));

// international tourisms
app.get("/info/international-tourism", (req, res) => {
    res.send("<html><body><h1>International-tourism</h1><h3>Fuente de información:<a href='https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995'>https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995</a></h3><table class='default'><tr><th>country</th><th>year</th><th>number-of-arribals</th><th>number-of-departures</th><th>expenditures</th></tr><tr><td>PORTUGAL</td><td>2014</td><td>10,497,000</td><td>1,502,000</td><td>5,213 billion </td></tr><tr><td>FRANCE</td><td>2014</td><td>206,599,000</td><td>31,941,000</td><td>58,464 billion </td></tr><tr><td>PORTUGAL</td><td>2012</td><td>7,503,000</td><td>1,361,000</td><td>4,482 billion </td></tr><tr><td>FRANCE</td><td>2012</td><td>197,522,000</td><td>29,642,000</td><td>50,068 billion </td></tr><tr><td>RUSSIAN FEDERATION</td><td>2010</td><td>22,281,000</td><td>39,232,000</td><td>30,169 billion </td></tr></table></body></html>");
});

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

app.get(BASE_API_PATH+"/international-tourisms/francia/2014",(req, res)=>{
    for(var i=0; i < inter_tourisms.length; i++){
        if(inter_tourisms[i].country == "francia" && inter_tourisms[i].year==2014){
            res.send(JSON.stringify(inter_tourisms[i], null, 2));
        }
    }
    res.sendStatus(200);
});

//no me sale
app.delete(BASE_API_PATH+"/international-tourisms/portugal/2012",(req, res)=>{
    res.sendStatus(204)
});

//no me sale
app.put(BASE_API_PATH+"/international-tourisms/portugal/2014",(req, res)=>{

});

app.put(BASE_API_PATH+"/international-tourisms",(req, res)=>{
    res.sendStatus(405)
});

app.post(BASE_API_PATH+"/international-tourisms/francia/2014",(req, res)=>{
    res.sendStatus(405)
});

app.listen(PORT, () => {
	console.log("Server ready at port " + PORT +"!");
})