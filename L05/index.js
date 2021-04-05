/*var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();*/

var express = require("express");
var path = require("path");

var app = express();
var BASE_APi_PATH = "/api/v1";

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));

app.get("/hello", (req, res) => {
    res.send("<html><body><h1>GET Hello from this tiny server</h1></body></html>");
});

app.get("/info/international-tourism", (req, res) => {
    res.send("<html><body><h1>International-tourism</h1><h3>Fuente de información:<a href='https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995'>https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995</a></h3><table class='default'><tr><th>country</th><th>year</th><th>number-of-arribals</th><th>number-of-departures</th><th>expenditures</th></tr><tr><td>PORTUGAL</td><td>2014</td><td>10,497,000</td><td>1,502,000</td><td>5,213 billion </td></tr><tr><td>FRANCE</td><td>2014</td><td>206,599,000</td><td>31,941,000</td><td>58,464 billion </td></tr><tr><td>PORTUGAL</td><td>2012</td><td>7,503,000</td><td>1,361,000</td><td>4,482 billion </td></tr><tr><td>FRANCE</td><td>2012</td><td>197,522,000</td><td>29,642,000</td><td>50,068 billion </td></tr><tr><td>RUSSIAN FEDERATION</td><td>2010</td><td>22,281,000</td><td>39,232,000</td><td>30,169 billion </td></tr></table></body></html>");
});

app.get("/info/air-pollution", (req, res) => {
    res.send("<html><body><h1>air-pollution</h1><h3>Fuente de información:<a href='https://ourworldindata.org/grapher/death-rates-from-air-pollution'>https://ourworldindata.org/grapher/death-rates-from-air-pollution</a></h3><table class='default'><tr><th>country</th><th>year</th><th>deaths-ambient-particulate-matter-pollution</th><th>deaths-household-air-pollution-from-solid-fuels</th><th>deaths-air-pollution</th></tr><tr><td>AFGANISTAN</td><td>1990</td><td>46.44658944</td><td>250.3629097</td>	<td>299.4773089</td></tr><tr><td>ANDORRA</td><td>2015</td><td>16.87235513</td><td>0.2629612925</td><td>19.44612087</td></tr><tr><td>BELGUIM</td><td>2015</td><td>18.35943959</td><td>0.114447081</td><td>20.47646879</td></tr><tr><td>LITHUANIA</td><td>2014</td><td>33.25769851</td><td>1.027443949</td><td>35.11186188</td></tr><tr><td>BENIN</td><td>1990</td><td>20.05143274</td><td>150.2770072</td><td>171.9752414</td></tr></table></body></html>");
});

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

app.post("/hello", (req, res) => {
    res.send("<html><body><h1>POST Hello from this tiny server</h1></body></html>");
});

/*app.get("/cool", (request, response) => {
	response.send(cool());
	console.log("New request to /cool has arrived");
	
});
*/
app.listen(port, () => {
	console.log("Server ready listening on port " + port);
})

app.get(BASE_APi_PATH+"/air-pollution", (req, res)=>{
    res.send(JSON.stringify(airpollutioninfo, null, 2));
});

app.get(BASE_APi_PATH+"/air-pollution/loadInitialData", (req, res)=>{   
    for(var i=0;i<airpollutioninfopush.length;i++){
        airpollutioninfo.push(airpollutioninfopush[i]);
    }
    res.send("Loaded Initial Data");
});

app.get(BASE_APi_PATH+"/air-pollution/AFGANISTAN", (req, res)=>{
    for(var i=0;i<airpollutioninfopush.length;i++){
        if(airpollutioninfopush[i].country==="AFGANISTAN"){
            res.send(JSON.stringify(airpollutioninfo, null, 2));
        }
    }
    
});

app.put(BASE_APi_PATH+"/air-pollution", (req, res)=>{   
   res.sendStatus(405);
});

app.post(BASE_APi_PATH+"/air-pollution")

fetch('http://localhost:3000/photos/', {
        method: "POST",
        body: JSON.stringify(photo),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        }
    }).then(function (response) {
        if (response.ok) {
            window.location.href = "index.php";
        } else {
            $("#errors-container").append(getError(response.statusText));
        }
    }).catch(console.log);