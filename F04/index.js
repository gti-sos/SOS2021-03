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

app.get(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    res.send("<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>International-tourisms</h2><h3>We compare how many flights are made internationally during different years. Fuente de información: <a href='https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995'>https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995</a></h3><table><tr><th>country</th><th>year</th><th>number-of-arribals</th><th>number-of-departures</th><th>expenditures</th> </tr><tr><td>PORTUGAL</td><td>2014</td><td>10,497,000</td><td>1,502,000</td><td>5,213 billion </td></tr><tr><td>FRANCE</td><td>2014</td><td>206,599,000</td><td>31,941,000</td><td>58,464 billion </td></tr><tr><td>PORTUGAL</td><td>2012</td><td>7,503,000</td><td>1,361,000</td><td>4,482 billion </td></tr><tr><td>FRANCE</td><td>2012</td><td>197,522,000</td><td>29,642,000</td><td>50,068 billion </td></tr><tr><td>RUSSIAN FEDERATION</td><td>2010</td><td>22,281,000</td><td>39,232,000</td><td>30,169 billion </td></tr></table></body></html>");
	
});
app.get(BASE_API_PATH+"international-tourisms/loadInitialData",(req,res)=>{

});
app.post(BASE_API_PATH+"/contacts", (req,res)=>{
    var newContact = req.body;
    console.log("new contact to be added: "+ JSON.stringify(newContact,null,2));
    contacts.push(newContact);
    res.sendStatus(201); 
});

app.listen(PORT, () => {
	console.log("Server ready at port " + PORT +"!");
})