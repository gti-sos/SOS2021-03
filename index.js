var express = require("express");
var path = require("path");
var PORT = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var app = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname,"public")));

////////////////////////////////////////////////////////
// international tourisms
////////////////////////////////////////////////////////

app.get("/info/international-tourisms", (req, res) => {
    res.send("<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>International-tourisms</h2><h3>We compare how many flights are made internationally during different years. Fuente de información: <a href='https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995'>https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995</a></h3><table><tr><th>country</th><th>year</th><th>number-of-arribals</th><th>number-of-departures</th><th>expenditures</th> </tr><tr><td>PORTUGAL</td><td>2014</td><td>10,497,000</td><td>1,502,000</td><td>5,213 billion </td></tr><tr><td>FRANCE</td><td>2014</td><td>206,599,000</td><td>31,941,000</td><td>58,464 billion </td></tr><tr><td>PORTUGAL</td><td>2012</td><td>7,503,000</td><td>1,361,000</td><td>4,482 billion </td></tr><tr><td>FRANCE</td><td>2012</td><td>197,522,000</td><td>29,642,000</td><td>50,068 billion </td></tr><tr><td>RUSSIAN FEDERATION</td><td>2010</td><td>22,281,000</td><td>39,232,000</td><td>30,169 billion </td></tr></table></body></html>");
});

var intertourism = require("./inter-tourism/inter-tourism.js");
intertourism.register(app);


app.listen(PORT, () => {
	console.log("Server ready at port " + PORT +"!");
});

var airpollution = require("./air-pollution/air-pollution.js");
airpollution.all(app);
////////////////////////////////////////////////////////
//Quality-of-life
////////////////////////////////////////////////////////
var qof = require("./quality-of-life/quality-of-life.js");
qof.all(app);

/*var qof= [];

var qof_push = [
    {
        "country":"Denmark",
        "year":2020,
        "quality-of-life":192.67,
        "purchacing-power":100.88,
        "health-care":80 
    },
    {
        "country":"Switzerland",
        "year":2020,
        "quality-of-life":192.01,
        "purchacing-power":119.853,
        "health-care":72.44 
    },
    {
        "country":"Finland",
        "year":2020,
        "quality-of-life":190.22,
        "purchacing-power":99.93,
        "health-care":75.79 
    },
    {
        "country":"Australia",
        "year":2020,
        "quality-of-life":186.21,
        "purchacing-power":107.31,
        "health-care":77.38 
    },
    {
        "country":"Netherlands",
        "year":2020,
        "quality-of-life":183.67,
        "purchacing-power":90.73,
        "health-care":64.65 
    }
];

//1
app.get(BASE_API_PATH+"/quality-of-life", (req, res)=>{
    res.send(JSON.stringify(qof, null, 2));
    res.sendStatus(200);
});

//2
app.get(BASE_API_PATH+"/quality-of-life/loadInitialData", (req, res)=>{   
    for(var i=0;i<qof_push.length;i++){
        qof.push(qof_push[i]);
    }
    res.send("Loaded Initial Data");
    res.sendStatus(200);
});

//3
app.post(BASE_API_PATH+"/quality-of-life", (req,res)=>{
    var newCountry = req.body;
    console.log("New country to be added: "+ JSON.stringify(newCountry,null,2));
    qof.push(newCountry);
    res.sendStatus(201); 
});

//4
app.get(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    country = req.params.country;
    var nuevo = [];
    for(var i=0; i < qof.length; i++){
        if(qof[i].year==req.params.year&&qof[i].country===country){
            nuevo.push(qof[i])
        }
    }
    res.send(JSON.stringify(nuevo, null, 2));
    
});

//5
app.delete(BASE_API_PATH+"/quality-of-life", (req,res)=>{
    for(var i=0; i < qof.length+1; i++){
        qof.pop() 
    }
    //req.send("Delete quality of life data")
    console.log("delete quality of life data");
    res.sendStatus(204); 
});

//6
app.put(BASE_API_PATH+"/quality-of-life",(req, res)=>{
    res.sendStatus(405)
});

//7
app.post(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    res.sendStatus(405)
});

//8
app.put(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    for(var i=0; i<qof.length; i++){
		if(qof[i].country==req.params.country && qof[i].year==req.params.year){
			qof[i]=req.body;
		}
	}
	res.send("Updated "+ req.params.country+", "+req.params.year);
	res.sendStatus(200);
});

//9
app.delete(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    for(var i=0; i < qof.length; i++){
        if(qof[i].country == req.params.country && qof[i].year==req.params.year){
            qof.splice(i, 1);
            
        }
    }
   // res.send("Deleted "+ req.params.country+", "+req.params.year);
   console.log("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204)

})

;*/