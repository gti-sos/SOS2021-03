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

var inter_tourisms = [
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

//1.GET a la lista de recursos (p.e. “/api/v1/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)
app.get(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    res.send(JSON.stringify(inter_tourisms,null,2)); //pasar objeto a JSON
});

//El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.
app.get(BASE_API_PATH+"/international-tourisms/loadInitialData",(req,res)=>{
    res.send(JSON.stringify(inter_tourisms_initial,null,2)); //pasar objeto a JSON

});

//2.POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.
app.post(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    var newCountry = req.body;
    console.log("new country to be added: "+ JSON.stringify(newCountry,null,2));
    inter_tourisms.push(newCountry);
    res.sendStatus(201); 
});

//3. GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .
app.get(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var nuevo = [];
    for(var i=0; i < inter_tourisms.length; i++){
        if(inter_tourisms[i].country == country && inter_tourisms[i].year== year){
            nuevo.push(inter_tourisms[i]);
        }
    }
    
    res.send(JSON.stringify(nuevo, null, 2));
    res.sendStatus(200);
});

//4. DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).
app.delete(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var nuevo = [];
    for(var i=0; i < inter_tourisms.length; i++){
        if(inter_tourisms[i].country == country && inter_tourisms[i].year==year){
            nuevo = inter_tourisms.splice(i, 1);
            console.log(nuevo);
        }
    }
    res.sendStatus(204);
    res.send("Deleted " +country+" "+year);
    
});

//5.PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 
app.put(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    country = req.params.country;
    year = req.params.year;
    var nuevo = [];
    for(var i=0; i<inter_tourisms.length; i++){
		if(inter_tourisms[i].country==country && inter_tourisms[i].year==year){
			inter_tourisms[i]=req.body;
		}
	}
	res.send("Updated "+country+" "+year);
	res.sendStatus(200);
});

//6. POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.
app.post(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    res.sendStatus(405);
});

//7. PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.
app.put(BASE_API_PATH+"/international-tourisms",(req, res)=>{
    res.sendStatus(405);
});

//8. DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos.
app.delete(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    for(var i=0; i < inter_tourisms.length+1; i++){
       inter_tourisms.pop();
    }
    res.send("Delete international tourisms data")
    res.sendStatus(204); 
});

app.listen(PORT, () => {
	console.log("Server ready at port " + PORT +"!");
})

////////////////////////////////////////////////////////
//AIR-POLLUTION
////////////////////////////////////////////////////////
var airpollutioninfo = [];

var airpollutioninfopush = [
    {
        "country": "AFGANISTAN", 
        "year": 1990, 
        "deaths-ambient-particulate-matter-pollution": 46.4465894382846, 
        "deaths-household-air-pollution-from-solid-fuels": 250.362909742374,
        "deaths-air-pollution": 299.47730888328
    }, 
    {
        "country": "ANDORRA", 
        "year": 2015, 
        "deaths-ambient-particulate-matter-pollution": 16.872355129519, 
        "deaths-household-air-pollution-from-solid-fuels": 0.262961292500896,
        "deaths-air-pollution": 19.4461208689732
    }, 
    {
        "country": "BELGIUM", 
        "year": 2015, 
        "deaths-ambient-particulate-matter-pollution": 18.3594395851173, 
        "deaths-household-air-pollution-from-solid-fuels": 0.114447080967493,
        "deaths-air-pollution": 20.4764687866951
    }, 
    {
        "country": "LITHUANIA", 
        "year": 2014, 
        "deaths-ambient-particulate-matter-pollution": 33.2576985134617, 
        "deaths-household-air-pollution-from-solid-fuels": 1.02744394947467,
        "deaths-air-pollution": 35.1118618798498
    }, 
    {
        "country": "BENIN", 
        "year": 1990, 
        "deaths-ambient-particulate-matter-pollution": 20.0514327372541, 
        "deaths-household-air-pollution-from-solid-fuels": 150.277007171104,
        "deaths-air-pollution": 171.975241436558
    }
];

app.get(BASE_API_PATH+"/air-pollution", (req, res)=>{
    res.send(JSON.stringify(airpollutioninfo, null, 2));
    res.sendStatus(200);
});

app.get(BASE_API_PATH+"/air-pollution/loadInitialData", (req, res)=>{   
    for(var i=0;i<airpollutioninfopush.length;i++){
        airpollutioninfo.push(airpollutioninfopush[i]);
    }
    res.send("Loaded Initial Data");
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/air-pollution", (req,res)=>{
    var newCountry = req.body;
    console.log("New country to be added: "+ JSON.stringify(newCountry,null,2));
    airpollutioninfo.push(newCountry);
    res.sendStatus(201); 
});

app.get(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    country = req.params.country;
    var nuevo = [];
    for(var i=0; i < airpollutioninfo.length; i++){
        if(airpollutioninfo[i].year==req.params.year&&airpollutioninfo[i].country===country){
            nuevo.push(airpollutioninfo[i])
        }
    }
    res.send(JSON.stringify(nuevo, null, 2));
    res.sendStatus(200);
    
});

app.delete(BASE_API_PATH+"/air-pollution", (req,res)=>{
    for(var i=0; i < airpollutioninfo.length+1; i++){
        airpollutioninfo.pop() 
    }
    req.send("Delete air pollution data")
    res.sendStatus(204); 
});

app.put(BASE_API_PATH+"/air-pollution",(req, res)=>{
    res.sendStatus(405)
});

app.post(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    res.sendStatus(405)
});

app.put(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    for(var i=0; i<airpollutioninfo.length; i++){
		if(airpollutioninfo[i].country==req.params.country && airpollutioninfo[i].year==req.params.year){
			airpollutioninfo[i]=req.body;
		}
	}
	res.send("Updated "+ req.params.country+", "+req.params.year);
	res.sendStatus(200);
});
app.delete(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    for(var i=0; i < airpollutioninfo.length; i++){
        if(airpollutioninfo[i].country == req.params.country && airpollutioninfo[i].year==req.params.year){
            airpollutioninfo.splice(i, 1);
            console.log(airpollutioninfo);
        }
    }
    res.send("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204)

})

////////////////////////////////////////////////////////
//Quality-of-life
////////////////////////////////////////////////////////
var qof= [];

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
    req.send("Delete quality of life data")
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
app.delete(BASE_API_PATH+"/quality-of-life:country/:year",(req, res)=>{
    for(var i=0; i < qof.length; i++){
        if(qof[i].country == req.params.country && qof[i].year==req.params.year){
            qof.splice(i, 1);
            console.log(qof);
        }
    }
    res.send("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204)

})

;