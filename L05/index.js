/*var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();*/

var express = require("express");
var path = require("path");

var app = express();

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));



app.get("/info/quality-of-life", (req, res) => {
	res.send("<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>Quality of life index 2020</h2><h3>Quality of Life Index by Country 2020 we are comparing data about quality of life with purchasing power and health care index.</h3><table><tr><th>country</th><th>year</th><th>quality-of-life</th><th>purchasing-power</th><th>health-care</th> </tr><tr>td>Denmark</td><td>2020</td><td>192.67</td><td>100.88</td><td>80</td> </tr><tr><td>Switzerland</td><td>2020</td><td>192.01</td><td>119.53</td><td>72.44</td></tr><tr><td>Finland</td><td>2020</td><td>190.22</td><td>99.93</td><td>75.79</td></tr><tr><td>Australia</td><td>2020</td><td>186.21</td><td>107.31</td><td>77.38</td></tr><tr><td>Netherlands</td><td>2020</td><td>183.67</td><td>90.73</td><td>64.65</td></tr></table></body></html>");});
	

app.get("/info/international-tourism", (req, res) => {
    res.send("<html><body><h1>International-tourism</h1><h3>Fuente de información:<a href='https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995'>https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995</a></h3><table class='default'><tr><th>country</th><th>year</th><th>number-of-arribals</th><th>number-of-departures</th><th>expenditures</th></tr><tr><td>PORTUGAL</td><td>2014</td><td>10,497,000</td><td>1,502,000</td><td>5,213 billion </td></tr><tr><td>FRANCE</td><td>2014</td><td>206,599,000</td><td>31,941,000</td><td>58,464 billion </td></tr><tr><td>PORTUGAL</td><td>2012</td><td>7,503,000</td><td>1,361,000</td><td>4,482 billion </td></tr><tr><td>FRANCE</td><td>2012</td><td>197,522,000</td><td>29,642,000</td><td>50,068 billion </td></tr><tr><td>RUSSIAN FEDERATION</td><td>2010</td><td>22,281,000</td><td>39,232,000</td><td>30,169 billion </td></tr></table></body></html>");
});

app.get("/info/air-pollution", (req, res) => {
    res.send("<html><body><h1>air-pollution</h1><h3>Fuente de información:<a href='https://ourworldindata.org/grapher/death-rates-from-air-pollution'>https://ourworldindata.org/grapher/death-rates-from-air-pollution</a></h3><table class='default'><tr><th>country</th><th>year</th><th>deaths-ambient-particulate-matter-pollution</th><th>deaths-household-air-pollution-from-solid-fuels</th><th>deaths-air-pollution</th></tr><tr><td>AFGANISTAN</td><td>1990</td><td>46.44658944</td><td>250.3629097</td>	<td>299.4773089</td></tr><tr><td>ANDORRA</td><td>2015</td><td>16.87235513</td><td>0.2629612925</td><td>19.44612087</td></tr><tr><td>BELGUIM</td><td>2015</td><td>18.35943959</td><td>0.114447081</td><td>20.47646879</td></tr><tr><td>LITHUANIA</td><td>2014</td><td>33.25769851</td><td>1.027443949</td><td>35.11186188</td></tr><tr><td>BENIN</td><td>1990</td><td>20.05143274</td><td>150.2770072</td><td>171.9752414</td></tr></table></body></html>");
});



app.listen(port, () => {
	console.log("Server ready listening on port " + port);
})