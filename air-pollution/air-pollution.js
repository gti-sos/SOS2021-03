var BASE_API_PATH = "/api/v1";
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

module.exports.getAll = (app) => {
    app.get(BASE_API_PATH+"/air-pollution", (req, res)=>{
    res.send(JSON.stringify(airpollutioninfo, null, 2));
    res.sendStatus(200);
    });
}

module.exports.loadInitialData = (app) => {
    app.get(BASE_API_PATH+"/air-pollution/loadInitialData", (req, res)=>{   
    for(var i=0;i<airpollutioninfopush.length;i++){
        airpollutioninfo.push(airpollutioninfopush[i]);
    }
    res.send("Loaded Initial Data");
    res.sendStatus(200);
    });
}

module.exports.postAll = (app) => {
    app.post(BASE_API_PATH+"/air-pollution", (req,res)=>{
    var newCountry = req.body;
    console.log("New country to be added: "+ JSON.stringify(newCountry,null,2));
    airpollutioninfo.push(newCountry);
    res.sendStatus(201); 
    });
}

module.exports.getOne = (app) => {
    app.get(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    country = req.params.country;
    var nuevo = [];
    for(var i=0; i < airpollutioninfo.length; i++){
        if(airpollutioninfo[i].year==req.params.year&&airpollutioninfo[i].country===country){
            nuevo.push(airpollutioninfo[i])
        }
    }
    res.send(JSON.stringify(nuevo, null, 2));
    
    });
}


module.exports.deleteAll = (app) => {
    app.delete(BASE_API_PATH+"/air-pollution", (req,res)=>{
    while(airpollutioninfo.length>0){
        airpollutioninfo.pop();
    }
    res.sendStatus(204); 
    });
}

module.exports.putAll = (app) => {
    app.put(BASE_API_PATH+"/air-pollution",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.postOne = (app) => {
    app.post(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    res.sendStatus(405);
    });
}

module.exports.putOne = (app) => {
    app.put(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    for(var i=0; i<airpollutioninfo.length; i++){
		if(airpollutioninfo[i].country==req.params.country && airpollutioninfo[i].year==req.params.year){
			airpollutioninfo[i]=req.body;
		}
	}
	res.send("Updated "+ req.params.country+", "+req.params.year);
	res.sendStatus(200);
    });
}

module.exports.deleteOne = (app) => {
    app.delete(BASE_API_PATH+"/air-pollution/:country/:year",(req, res)=>{
    for(var i=0; i < airpollutioninfo.length; i++){
        if(airpollutioninfo[i].country == req.params.country && airpollutioninfo[i].year==req.params.year){
            airpollutioninfo.splice(i, 1);
            console.log(airpollutioninfo);
        }
    }
    res.send("Deleted "+ req.params.country+", "+req.params.year);
    res.sendStatus(204)

    });
}
