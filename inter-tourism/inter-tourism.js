var BASE_API_PATH = "/api/v1";
////////////////////////////////////////////////////////
//INTERNATIONAL-TOURISMS
////////////////////////////////////////////////////////
var inter_tourisms_initial = [
    {
        "country":"portugal",
        "year":2014,
        "number-of-arribals":10497000,
        "number-of-departures":1502000,
        "expenditures-billion":5213 
    },
    {
        "country":"rusian-federation",
        "year":2010,
        "number-of-arribals":22281000,
        "number-of-departures":39232000,
        "expenditures-billion":30169
    },
    {
        "country":"francia",
        "year":2014,
        "number-of-arribals":206599000,
        "number-of-departures":31941000,
        "expenditures-billion":58464
    }
];

var inter_tourisms = [];


module.exports.getAll = (app) => {
    app.get(BASE_API_PATH+"/international-tourisms", (req, res)=>{
    res.send(JSON.stringify(inter_tourisms, null, 2));
    res.sendStatus(200);
    });
}

module.exports.loadInitialData = (app) => {
    app.get(BASE_API_PATH+"/international-tourisms/loadInitialData", (req, res)=>{   
    for(var i=0;i<inter_tourisms_initial.length;i++){
        inter_tourisms.push(inter_tourisms_initial[i]);
    }
    res.send("Loaded Initial Data");
    res.sendStatus(200);
    });
}

module.exports.postAll = (app) => {
    app.post(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    var newCountry = req.body;
    console.log("New country to be added: "+ JSON.stringify(newCountry,null,2));
    inter_tourisms.push(newCountry);
    res.sendStatus(201); 
    });
}

module.exports.getOne = (app) => {
    app.get(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    country = req.params.country;
    var nuevo = [];
    for(var i=0; i < inter_tourisms.length; i++){
        if(inter_tourisms[i].year==req.params.year&&inter_tourisms[i].country===country){
            nuevo.push(inter_tourisms[i])
        }
    }
    res.send(JSON.stringify(nuevo, null, 2));
    
    });
}

module.exports.deleteAll = (app) => {
    app.delete(BASE_API_PATH+"/international-tourisms", (req,res)=>{
    while(inter_tourisms.length>0){
        inter_tourisms.pop();
    }
    res.sendStatus(204); 
    });
}

module.exports.putAll = (app) => {
    app.put(BASE_API_PATH+"/international-tourisms",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.postOne = (app) => {
    app.post(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.putOne = (app) => {
    app.put(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    for(var i=0; i<inter_tourisms.length; i++){
		if(inter_tourisms[i].country==req.params.country && inter_tourisms[i].year==req.params.year){
			inter_tourisms[i]=req.body;
		}
	}
	res.send("Updated "+ req.params.country+", "+req.params.year);
	res.sendStatus(200);
    });
}

module.exports.deleteOne = (app) => {
    app.delete(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
    for(var i=0; i < inter_tourisms.length; i++){
        if(inter_tourisms[i].country == req.params.country && inter_tourisms[i].year==req.params.year){
            inter_tourisms.splice(i, 1);
            console.log(inter_tourisms);
        }
    }
    res.send("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204);

    });
}