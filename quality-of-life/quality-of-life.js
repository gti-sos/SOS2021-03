var BASE_API_PATH = "/api/v1";

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

module.exports.getAll = (app) => {
    app.get(BASE_API_PATH+"/quality-of-life", (req, res)=>{
    res.send(JSON.stringify(qof, null, 2));
    res.sendStatus(200);
    });
}

module.exports.loadInitialData = (app) => {
    app.get(BASE_API_PATH+"/quality-of-life/loadInitialData", (req, res)=>{   
    for(var i=0;i<qof_push.length;i++){
        qof.push(qof_push[i]);
    }
    res.send("Loaded Initial Data");
    res.sendStatus(200);
    });
}

module.exports.postAll = (app) => {
    app.post(BASE_API_PATH+"/quality-of-life", (req,res)=>{
    var newCountry = req.body;
    console.log("New country to be added: "+ JSON.stringify(newCountry,null,2));
    qof.push(newCountry);
    res.sendStatus(201); 
    });
}

module.exports.getOne = (app) => {
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
}

module.exports.deleteAll = (app) => {
    app.delete(BASE_API_PATH+"/quality-of-life", (req,res)=>{
    while(qof.length>0){
        qof.pop();
    }
    res.sendStatus(204); 
    });
}

module.exports.putAll = (app) => {
    app.put(BASE_API_PATH+"/quality-of-life",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.postOne = (app) => {
    app.post(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.putOne = (app) => {
    app.put(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    for(var i=0; i<qof.length; i++){
		if(qof[i].country==req.params.country && qof[i].year==req.params.year){
			qof[i]=req.body;
		}
	}
	res.send("Updated "+ req.params.country+", "+req.params.year);
	res.sendStatus(200);
    });
}

module.exports.deleteOne = (app) => {
    app.delete(BASE_API_PATH+"/quality-of-life/:country/:year",(req, res)=>{
    for(var i=0; i < qof.length; i++){
        if(qof[i].country == req.params.country && qof[i].year==req.params.year){
            qof.splice(i, 1);
            console.log(qof);
        }
    }
    res.send("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204);

    });
}