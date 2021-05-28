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
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution": 46.4465894382846, 
            "deaths_household_air_pollution_from_solid_fuels": 250.362909742374,
            "deaths_air_pollution": 299.47730888328
        }, 
        {
            "country": "ANDORRA", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 16.872355129519, 
            "deaths_household_air_pollution_from_solid_fuels": 0.262961292500896,
            "deaths_air_pollution": 19.4461208689732
        }, 
        {
            "country": "BELGIUM", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 18.3594395851173, 
            "deaths_household_air_pollution_from_solid_fuels": 0.114447080967493,
            "deaths_air_pollution": 20.4764687866951
        }, 
        {
            "country": "LITHUANIA", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 33.2576985134617, 
            "deaths_household_air_pollution_from_solid_fuels": 1.02744394947467,
            "deaths_air_pollution": 35.1118618798498
        }, 
        {
            "country": "BENIN", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution": 20.0514327372541, 
            "deaths_household_air_pollution_from_solid_fuels": 150.277007171104,
            "deaths_air_pollution": 171.975241436558
        },
        {
            "country": "AFGANISTAN", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 47.334536914397916, 
            "deaths_household_air_pollution_from_solid_fuels": 141.3542376454552,
            "deaths_air_pollution": 191.8011189732795
        },
        {
            "country": "AFGANISTAN", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 45.19389822935474,
            "deaths_household_air_pollution_from_solid_fuels": 147.1349129005796 ,
            "deaths_air_pollution": 195.43695820699548
        },
        {
            "country": "ANDORRA", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution": 25.338300470305498,
            "deaths_household_air_pollution_from_solid_fuels": 1.0047451735791857 ,
            "deaths_air_pollution": 29.02388062025666
        },
        {
            "country": "ANDORRA", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 14.19962499022684,
            "deaths_household_air_pollution_from_solid_fuels": 0.17168795776875057 ,
            "deaths_air_pollution": 16.652145832769765
        },
        {
            "country": "BELGIUM", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution": 37.0224027144499,
            "deaths_household_air_pollution_from_solid_fuels": 0.6841685227347136,
            "deaths_air_pollution": 40.20601539563806
        },
        {
            "country": "BELGIUM", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 18.098626508325612,
            "deaths_household_air_pollution_from_solid_fuels": 0.12003941258315064,
            "deaths_air_pollution": 20.193664782882074
        },
        {
            "country": "LITHUANIA", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 32.890370223967935,
            "deaths_household_air_pollution_from_solid_fuels": 1.020798248649292,
            "deaths_air_pollution": 34.738008760660385 
        },
        {
            "country": "LITHUANIA", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution": 52.32639488468969,
            "deaths_household_air_pollution_from_solid_fuels": 2.2335803481745398,
            "deaths_air_pollution": 56.61234090982057 
        }, 
        {
            "country": "LITHUANIA", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 46.69695285305829,
            "deaths_household_air_pollution_from_solid_fuels": 1.6785058958688703,
            "deaths_air_pollution": 49.89161764678314
        }, 
        {
            "country": "LITHUANIA", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 42.056507019458444,
            "deaths_household_air_pollution_from_solid_fuels": 1.3707577290894508,
            "deaths_air_pollution":  44.77774234153415
        }, 
        {
            "country": "BENIN", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 17.959697793971948,
            "deaths_household_air_pollution_from_solid_fuels": 101.30052435565311,
            "deaths_air_pollution": 120.75976564689653
        },
        {
            "country": "BENIN", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 20.0514327372541, 
            "deaths_household_air_pollution_from_solid_fuels": 150.277007171104,
            "deaths_air_pollution": 171.975241436558
        }, 
        {
            "country": "AFGANISTAN", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 45.585062178377854,
            "deaths_household_air_pollution_from_solid_fuels": 238.11352007418402,
            "deaths_air_pollution": 286.4474545749148
        }, 
        {
            "country": "AFGANISTAN", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 45.03400426282654,
            "deaths_household_air_pollution_from_solid_fuels": 235.9487736595326,
            "deaths_air_pollution":  283.7862707748104
        }, 
        {
            "country": "BENIN", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 20.555442026318993,
            "deaths_household_air_pollution_from_solid_fuels": 136.72425446523226,
            "deaths_air_pollution": 158.63359458781744
        }, 
        {
            "country": "BENIN", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 21.287818831481662,
            "deaths_household_air_pollution_from_solid_fuels": 129.3568572207377,
            "deaths_air_pollution":  151.95273020648696
        },
        {
            "country": "ANDORRA", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 18.16564959005798,
            "deaths_household_air_pollution_from_solid_fuels": 0.38465532945150094,
            "deaths_air_pollution": 20.914081116845235
        }, 
        {
            "country": "ANDORRA", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 21.004748015491174,
            "deaths_household_air_pollution_from_solid_fuels": 0.5054674106178751,
            "deaths_air_pollution":  23.977515037258293
        }, 
        {
            "country": "BELGIUM", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 31.163032386905176,
            "deaths_household_air_pollution_from_solid_fuels": 0.40011298478775237,
            "deaths_air_pollution": 34.24623690875665
        }, 
        {
            "country": "BELGIUM", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 29.466697610492755,
            "deaths_household_air_pollution_from_solid_fuels": 0.34942663338090385,
            "deaths_air_pollution":  32.37665767377515
        },
        {
            "country": "CHINA", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution":56.03075191952254,
            "deaths_household_air_pollution_from_solid_fuels": 31.909869012073564,
            "deaths_air_pollution":  97.83587858207461
        },
	    {
            "country": "CHINA", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 56.482741980369,
            "deaths_household_air_pollution_from_solid_fuels": 29.46463845165397,
            "deaths_air_pollution":  95.43912890437898
        },
	    {
            "country": "CHINA", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 57.52544268971824,
            "deaths_household_air_pollution_from_solid_fuels": 27.471811315084842,
            "deaths_air_pollution":  94.24721802309006
        },
	    {
            "country": "CHINA", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 58.41215079376876,
            "deaths_household_air_pollution_from_solid_fuels": 25.541573303355555,
            "deaths_air_pollution":  92.97014294146548
        },
	    {
            "country": "CHINA", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 58.74084547779062,
            "deaths_household_air_pollution_from_solid_fuels": 23.3218830475631,
            "deaths_air_pollution": 90.65488369677888
        },
        {
            "country": "GERMANY", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution":21.278546337893406,
            "deaths_household_air_pollution_from_solid_fuels": 0.4476152121828848,
            "deaths_air_pollution":  23.4585023550537
        },
	    {
            "country": "GERMANY", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 21.126482433516603,
            "deaths_household_air_pollution_from_solid_fuels": 0.4110438420176187,
            "deaths_air_pollution":  23.303104698731985
        },
	    {
            "country": "GERMANY", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 21.04022903758618,
            "deaths_household_air_pollution_from_solid_fuels": 0.38914270241364507,
            "deaths_air_pollution":  23.238679895498663
        },
	    {
            "country": "GERMANY", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 20.68905286671175,
            "deaths_household_air_pollution_from_solid_fuels": 0.3530432220577874,
            "deaths_air_pollution":  22.868639030093235
        },
	    {
            "country": "GERMANY", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 19.907600055009738,
            "deaths_household_air_pollution_from_solid_fuels": 0.3342961598233201,
            "deaths_air_pollution": 22.071574989229063
        },
        {
            "country": "INDIA", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution":62.099053854061516,
            "deaths_household_air_pollution_from_solid_fuels": 76.24102732884097,
            "deaths_air_pollution":  148.05627209360725
        },
	    {
            "country": "INDIA", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 63.575442513089826,
            "deaths_household_air_pollution_from_solid_fuels": 74.03378250100018,
            "deaths_air_pollution":  147.32481232703338
        },
	    {
            "country": "INDIA", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 64.4532424014687,
            "deaths_household_air_pollution_from_solid_fuels": 71.73601914254124,
            "deaths_air_pollution":  145.87361424853114
        },
	    {
            "country": "INDIA", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 65.61668921511249,
            "deaths_household_air_pollution_from_solid_fuels": 69.91364358537496,
            "deaths_air_pollution":  145.220559610492
        },
	    {
            "country": "INDIA", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 67.17222333873804,
            "deaths_household_air_pollution_from_solid_fuels": 67.91702867237429,
            "deaths_air_pollution": 144.74345237213464
        },
        {
            "country": "SPAIN", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution":16.971786724060184,
            "deaths_household_air_pollution_from_solid_fuels": 0.8489929449037286,
            "deaths_air_pollution":  20.653582098038086
        },
	    {
            "country": "SPAIN", 
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 16.40830230706153,
            "deaths_household_air_pollution_from_solid_fuels": 0.7771692558096521,
            "deaths_air_pollution":  19.940107676471055
        },
	    {
            "country": "SPAIN", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 15.545645850804119,
            "deaths_household_air_pollution_from_solid_fuels": 0.6843055489717949,
            "deaths_air_pollution":  18.878241876784262
        },
	    {
            "country": "SPAIN", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 14.776872623217473,
            "deaths_household_air_pollution_from_solid_fuels": 0.621369488359192,
            "deaths_air_pollution":  17.960684845994948
        },
	    {
            "country": "SPAIN", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 15.040427212251279,
            "deaths_household_air_pollution_from_solid_fuels": 0.5774207348444119,
            "deaths_air_pollution": 18.146961195551377
        },
        {
            "country": "UNITED-STATES", 
            "year": 2007, 
            "deaths_ambient_particulate_matter_pollution":21.495669050966843,
            "deaths_household_air_pollution_from_solid_fuels": 0.13077047071445816,
            "deaths_air_pollution":  25.117557371038547
        },
	    {
            "country": "UNITED-STATES",  
            "year": 2008, 
            "deaths_ambient_particulate_matter_pollution": 20.999778503957813,
            "deaths_household_air_pollution_from_solid_fuels": 0.1241665689146574,
            "deaths_air_pollution":  24.654823568542454
        },
	    {
            "country": "UNITED-STATES", 
            "year": 2009, 
            "deaths_ambient_particulate_matter_pollution": 20.298196024326433,
            "deaths_household_air_pollution_from_solid_fuels": 0.11667254564853219,
            "deaths_air_pollution":  23.931274856601522
        },
	    {
            "country": "UNITED-STATES", 
            "year": 2010, 
            "deaths_ambient_particulate_matter_pollution": 19.38970129779831,
            "deaths_household_air_pollution_from_solid_fuels": 0.10838182983773656,
            "deaths_air_pollution":  22.972047035270514
        },
	    {
            "country": "UNITED-STATES", 
            "year": 2011, 
            "deaths_ambient_particulate_matter_pollution": 19.773824419965283,
            "deaths_household_air_pollution_from_solid_fuels": 0.1044533855520735,
            "deaths_air_pollution": 23.396665887702326
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


app.use("/proxyHeroku", function(req, res) {
    console.log(`New Proxy Call!`);

    var apiServerHost = 'https://sos2021-10.herokuapp.com/api/v1/air-pollution';    //aqui la direccion de la api a la que me quiero conectar
    console.log(`apiServerHost = <${apiServerHost}>`);
    console.log(`baseURL = <${req.baseUrl}>`);
    console.log(`url = <${req.url}>`);
   
    var url = apiServerHost + req.url;

    console.log(`piped: ${req.baseUrl}${req.url} -> ${url}`);

    req.pipe(request(url)).pipe(res);
  });
}