module.exports.all = (app) => {
    var DataStore = require("nedb");
    var db = new DataStore;
    var BASE_API_PATH = "/api/v1";
    ///////////////////////////////////////////////////////
    //AIR-POLLUTION 
    ////////////////////////////////////////////////////////
    var airpollutioninfo = [];

    var airpollutioninfopush = [
        {
            "country": "AFGANISTAN", 
            "year": 1990, 
            "deaths_ambient_particulate_matter_pollution": 46.4465894382846, 
            "deaths_household_air_pollution_from_solid_fuels": 250.362909742374,
            "deaths_air_pollution": 299.47730888328
        }, 
        {
            "country": "ANDORRA", 
            "year": 2015, 
            "deaths_ambient_particulate_matter_pollution": 16.872355129519, 
            "deaths_household_air_pollution_from_solid_fuels": 0.262961292500896,
            "deaths_air_pollution": 19.4461208689732
        }, 
        {
            "country": "BELGIUM", 
            "year": 2015, 
            "deaths_ambient_particulate_matter_pollution": 18.3594395851173, 
            "deaths_household_air_pollution_from_solid_fuels": 0.114447080967493,
            "deaths_air_pollution": 20.4764687866951
        }, 
        {
            "country": "LITHUANIA", 
            "year": 2014, 
            "deaths_ambient_particulate_matter_pollution": 33.2576985134617, 
            "deaths_household_air_pollution_from_solid_fuels": 1.02744394947467,
            "deaths_air_pollution": 35.1118618798498
        }, 
        {
            "country": "BENIN", 
            "year": 1990, 
            "deaths_ambient_particulate_matter_pollution": 20.0514327372541, 
            "deaths_household_air_pollution_from_solid_fuels": 150.277007171104,
            "deaths_air_pollution": 171.975241436558
        }
    ];
db.insert(airpollutioninfo);
//loadInitialData GET
app.get(BASE_API_PATH+"/air-pollution/loadInitialData", (req,res) =>{
	var fichero = db.getAllData();
	if(fichero.length>=1){
		res.sendStatus(409);
		console.log("There is already loaded data");
	}else{
		db.insert(airpollutioninfopush);	
		res.sendStatus(200);
		JSON.stringify(airpollutioninfopush,null,2);
    }
});


//GET PAGINACION Y BUSQUEDAS O GENERAL
app.get(BASE_API_PATH+"/air-pollution", (req,res) =>{
		
		var limit = req.query.limit;
		var offset = req.query.offset;
		console.log("limit="+limit+", offset="+offset);
		
		var country = req.query.country;
		var year = parseInt(req.query.year);
		var deaths_ambient_particulate_matter_pollution = parseFloat(req.query.deaths_ambient_particulate_matter_pollution);
		var deaths_household_air_pollution_from_solid_fuels = parseFloat(req.query.deaths_household_air_pollution_from_solid_fuels);
		var deaths_air_pollution = parseFloat(req.query.deaths_air_pollution);
		
		var fromYear = parseInt(req.query.fromYear);
		var toYear = parseInt(req.query.toYear);
		console.log("country="+country+", year="+year+", deaths_ambient_particulate_matter_pollution="+deaths_ambient_particulate_matter_pollution+", bus="+deaths_household_air_pollution_from_solid_fuels+", deaths_air_pollution="+deaths_air_pollution+", fromYear="+fromYear+", toYear="+toYear);
		
		if(country){
			
			db.find({country: country}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
				if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                }
			});
		}else if(year){
			db.find({year: year}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
				if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                    
                    
                }
			});
		}else if(deaths_ambient_particulate_matter_pollution){
			db.find({deaths_ambient_particulate_matter_pollution: deaths_ambient_particulate_matter_pollution}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
				if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                }
			});
		}else if(deaths_household_air_pollution_from_solid_fuels){
			db.find({deaths_household_air_pollution_from_solid_fuels: deaths_household_air_pollution_from_solid_fuels}).skip(offset).limit(limit).exec(  (err, airpollution1) =>  {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                    
                }
			});
		}else if(deaths_air_pollution){
			db.find({deaths_air_pollution: deaths_air_pollution}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
				if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                }
			});
		}else if(fromYear && toYear){
			db.find({year: {$gte: fromYear, $lt: toYear}}).sort({year: 1}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                }
			});
		}else{
			db.find({}).skip(offset).limit(limit).exec(  (err, airpollution1) => {
				if(err){
                    res.sendStatus(500);
                }else {
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    }
                    
                }
			});
		}
	});
	
//POST
app.post(BASE_API_PATH+"/air-pollution",(req,res) =>{

		var newregister = req.body;
		var country1 = req.body.country;
		var year1 = parseInt(req.body.year);
        
		db.find({$and : [{country : country1}, {year : year1}]},(error, airpollution1)=>{
			if(error){
                res.sendStatus(500);
            }else if(airpollution1.length != 0){	
				console.log("409.ALREADY EXIST");
				res.sendStatus(409);
			}else if((!newregister.country || !newregister.year || 	!newregister.deaths_ambient_particulate_matter_pollution || !newregister.deaths_household_air_pollution_from_solid_fuels
		  				 || !newregister.deaths_air_pollution)||Object.keys(newregister).length != 5){
				console.log("Syntax error on new data body");
				res.sendStatus(400);
			}else{
				db.insert(newregister);
				res.sendStatus(201);
			}
		});
	});		

//DELETE ONE
app.delete(BASE_API_PATH+"/air-pollution/:country/:year", (req,res)=>{
	var country1 = req.params.country;
    var year1 = parseInt(req.params.year);
	db.count({$and : [{country : country1}, {year : year1}]},(err,count) => {
        if(err){
            res.sendStatus(500);
        }else if(count==0){
		res.sendStatus(404,"NOT FOUND");
	}else{
		db.find({$and : [{country : country1}, {year : year1}]}, (err,airpollution1) =>{
			db.remove({$and : [{country : country1}, {year : year1}]}, {}, (err,airpollution1) =>{}); 		
	    });
		res.sendStatus(200,"OK");
	}
});
	
});

//PUT
app.put(BASE_API_PATH+"/air-pollution/:country/:year", (req, res) =>{

        var country1 = req.params.country;
        var year1 = parseInt(req.params.year);
		var up = req.body;
        console.log(up);
		db.find({$and : [{country : country1}, {year : year1}]},(error,airpollution1)=>{
			console.log(airpollution1);
			if(error){
                res.sendStatus(500);
            }else if(airpollution1.length == 0){
				console.log("Error 404, Not Found .");
				res.sendStatus(404);
			}else if((!up.country || !up.year || !up.deaths_ambient_particulate_matter_pollution || !up.deaths_household_air_pollution_from_solid_fuels
		  			 || !up.deaths_air_pollution || up.country != country1 )
					 || Object.keys(up).length != 5
					){
				
					res.sendStatus(400);
			}else{
				db.update({$and : [{country : country1}, {year : year1}]},{$set: up});
				console.log("PUT OK");
				res.sendStatus(200);
			}
		});
	});

//fallo POST a un recurso
app.post(BASE_API_PATH+"/air-pollution/:country/:year",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	
});
//fallo PUT base
app.put(BASE_API_PATH+"/air-pollution",(req,res) =>{
		res.sendStatus(405,"METHOD NOT ALLOWED");
	
});

	
	//DELETE ALL
app.delete(BASE_API_PATH+"/air-pollution", (req,res) =>{
	db.find({}, (err,airpollution1) =>{
    	if(err){
            res.sendStatus(500);
        }else if(airpollution1.length != 0){
        	db.remove({},{multi:true},(err,airpollution1)=>{		
		});
        	res.sendStatus(200,"OK");
    	}else{
        	res.sendStatus(405,"METHOD NOT ALLOWED");
    }
	});
});
//DATO A PARTIR DE COUNTRY Y YEAR
	app.get(BASE_API_PATH+"/air-pollution/:country/:year", (req,res)=>{

        var country = req.params.country;
        var year = parseInt(req.params.year);

        db.find({"country" :country, "year":year},(error, airpollution1)=>{
            if(error){
                res.sendStatus(500);
            }else if(airpollution1.length==0){
                console.log("404. Not Found");
                res.sendStatus(404);
            }else{
                
                if(airpollution1.length===1){
                    delete airpollution1[0]._id;
                    res.send(JSON.stringify(airpollution1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                }else{
                airpollution1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(airpollution1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                }
                

            
            }
        })
    });	


	
//delete dato country y año
app.delete(BASE_API_PATH+"/air-pollution/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = parseInt(req.params.year);

    db.find({"country":country, "year":year},(error, airpollution1)=>{
        if(error){
            res.sendStatus(500);
        }else if(airpollution1.length==0){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.sendStatus(200,"OK");
            db.remove({ "country":country, "year":year }); 
            }
        })
    });	
}