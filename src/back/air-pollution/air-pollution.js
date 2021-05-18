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
        },
        {
            "country": "AFGANISTAN", 
            "year": 2015, 
            "deaths_ambient_particulate_matter_pollution": 47.334536914397916, 
            "deaths_household_air_pollution_from_solid_fuels": 141.3542376454552,
            "deaths_air_pollution": 191.8011189732795
        },
        {
            "country": "AFGANISTAN", 
            "year": 2014, 
            "deaths_ambient_particulate_matter_pollution": 45.19389822935474,
            "deaths_household_air_pollution_from_solid_fuels": 147.1349129005796 ,
            "deaths_air_pollution": 195.43695820699548
        },
        {
            "country": "ANDORRA", 
            "year": 1990, 
            "deaths_ambient_particulate_matter_pollution": 25.338300470305498,
            "deaths_household_air_pollution_from_solid_fuels": 1.0047451735791857 ,
            "deaths_air_pollution": 29.02388062025666
        },
        {
            "country": "ANDORRA", 
            "year": 2014, 
            "deaths_ambient_particulate_matter_pollution": 14.19962499022684,
            "deaths_household_air_pollution_from_solid_fuels": 0.17168795776875057 ,
            "deaths_air_pollution": 16.652145832769765
        },
        {
            "country": "BELGIUM", 
            "year": 1990, 
            "deaths_ambient_particulate_matter_pollution": 37.0224027144499,
            "deaths_household_air_pollution_from_solid_fuels": 0.6841685227347136,
            "deaths_air_pollution": 40.20601539563806
        },
        {
            "country": "BELGIUM", 
            "year": 2014, 
            "deaths_ambient_particulate_matter_pollution": 18.098626508325612,
            "deaths_household_air_pollution_from_solid_fuels": 0.12003941258315064,
            "deaths_air_pollution": 20.193664782882074
        },
        {
            "country": "LITHUANIA", 
            "year": 1990, 
            "deaths_ambient_particulate_matter_pollution": 52.32639488468969,
            "deaths_household_air_pollution_from_solid_fuels": 2.2335803481745398,
            "deaths_air_pollution": 56.61234090982057 
        }, 
        {
            "country": "LITHUANIA", 
            "year": 2015, 
            "deaths_ambient_particulate_matter_pollution": 32.890370223967935,
            "deaths_household_air_pollution_from_solid_fuels": 1.020798248649292,
            "deaths_air_pollution": 34.738008760660385 
        },
        {
            "country": "BENIN", 
            "year": 2014, 
            "deaths_ambient_particulate_matter_pollution": 17.959697793971948,
            "deaths_household_air_pollution_from_solid_fuels": 101.30052435565311,
            "deaths_air_pollution": 120.75976564689653
        },
        {
            "country": "BENIN", 
            "year": 2015, 
            "deaths_ambient_particulate_matter_pollution": 20.0514327372541, 
            "deaths_household_air_pollution_from_solid_fuels": 150.277007171104,
            "deaths_air_pollution": 171.975241436558
        }, 
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
                    /*
                    if(airpollution1.length===1){
                        delete airpollution1[0]._id;
                        res.send(JSON.stringify(airpollution1[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1[0],null,2));
                    }else{*/
                    airpollution1.forEach( (v) => {
                        delete v._id;
                    });
                    res.send(JSON.stringify(airpollution1,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(airpollution1,null,2));
                    //}
                    
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

		var newregister = {
            "country": req.body.country, 
            "year": parseInt(req.body.year), 
            "deaths_ambient_particulate_matter_pollution": parseFloat(req.body.deaths_ambient_particulate_matter_pollution), 
            "deaths_household_air_pollution_from_solid_fuels": parseFloat(req.body.deaths_household_air_pollution_from_solid_fuels),
            "deaths_air_pollution": parseFloat(req.body.deaths_air_pollution)
        }
		var country1 = req.body.country;
		var year1 = parseInt(req.body.year);
        console.log(newregister);
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

//PUT OK
app.put(BASE_API_PATH+"/air-pollution/:country/:year", (req, res) =>{

        var country1 = req.params.country;
        var year1 = parseInt(req.params.year);
		var up = {
            "country": req.body.country, 
            "year": parseInt(req.body.year), 
            "deaths_ambient_particulate_matter_pollution": parseFloat(req.body.deaths_ambient_particulate_matter_pollution), 
            "deaths_household_air_pollution_from_solid_fuels": parseFloat(req.body.deaths_household_air_pollution_from_solid_fuels),
            "deaths_air_pollution": parseFloat(req.body.deaths_air_pollution)
        };
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