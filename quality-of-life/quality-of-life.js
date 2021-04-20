module.exports.all = (app) => {
    var DataStore = require("nedb");
    var db = new DataStore;
    var BASE_API_PATH = "/api/v1";

////////////////////////////////////////////////////////
//Quality-of-life
////////////////////////////////////////////////////////
var qof= [];

var qof_push = [
    {
        "country":"Denmark",
        "year":2020,
        "quality_of_life":192.67,
        "purchacing_power":100.88,
        "health_care":80 
    },
    {
        "country":"Switzerland",
        "year":2020,
        "quality_of_life":192.01,
        "purchacing_power":119.853,
        "health_care":72.44 
    },
    {
        "country":"Finland",
        "year":2020,
        "quality_of_life":190.22,
        "purchacing_power":99.93,
        "health_care":75.79 
    },
    {
        "country":"Australia",
        "year":2020,
        "quality_of_life":186.21,
        "purchacing_power":107.31,
        "health_care":77.38 
    },
    {
        "country":"Netherlands",
        "year":2020,
        "quality_of_life":183.67,
        "purchacing_power":90.73,
        "health_care":64.65 
    }
];
db.insert(qof);
//loadInitialData GET
app.get(BASE_API_PATH+"/quality-of-life/loadInitialData", (req,res) =>{
	var fichero = db.getAllData();
	if(fichero.length>=1){
		res.sendStatus(409);
		console.log("There is already loaded data");
	}else{
		db.insert(qof_push);	
		res.sendStatus(200);
		JSON.stringify(qof_push,null,2);
    }
});

//GET PAGINACION Y BUSQUEDAS O GENERAL
app.get(BASE_API_PATH+"/quality-of-life", (req,res) =>{
		
    var limit = req.query.limit;
    var offset = req.query.offset;
    console.log("limit="+limit+", offset="+offset);
    
    var country = req.query.country;
    var year = parseInt(req.query.year);
    var quality_of_life = parseFloat(req.query.quality_of_life);
    var purchacing_power = parseFloat(req.query.purchacing_power);
    var health_care = parseFloat(req.query.health_care);
    
    var fromYear = parseInt(req.query.fromYear);
    var toYear = parseInt(req.query.toYear);
    console.log("country="+country+", year="+year+", quality_of_life="+quality_of_life+", bus="+purchacing_power+", purchacing_power="+purchacing_power+", fromYear="+fromYear+", toYear="+toYear);
    
    if(country){
			
        db.find({country: country}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
            }
        });

    }else if(year){
        db.find({year: year}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
                
                
            }
        });

    }else if(quality_of_life){
        db.find({quality_of_life: quality_of_life}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
            }
        });

    }else if(purchacing_power){
        db.find({purchacing_power: purchacing_power}).skip(offset).limit(limit).exec(  (err, quality_of_life1) =>  {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
                
            }
        });

    }else if(health_care){
        db.find({health_care: health_care}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
            }
        });

    }else if(fromYear && toYear){
        db.find({year: {$gte: fromYear, $lt: toYear}}).sort({year: 1}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
            }
        });
    }else{
        db.find({}).skip(offset).limit(limit).exec(  (err, quality_of_life1) => {
            if(err){
                res.sendStatus(500);
            }else {
                if(quality_of_life1.length===1){
                    delete quality_of_life1[0]._id;
                    res.send(JSON.stringify(quality_of_life1[0],null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
                }else{
                    quality_of_life1.forEach( (v) => {
                    delete v._id;
                });
                res.send(JSON.stringify(quality_of_life1,null,2));
                
                    console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
                }
                
            }
        });
    }
});
//POST

app.post(BASE_API_PATH+"/quality-of-life",(req,res) =>{

    var newregister = req.body;
    var country1 = req.body.country;
    var year1 = parseInt(req.body.year);
    console.log(newregister);
    db.find({$and : [{country : country1}, {year : year1}]},(error, quality_of_life1)=>{
        if(error){
            res.sendStatus(500);
        }else if(quality_of_life1.length != 0){	
            console.log("409.ALREADY EXIST");
            res.sendStatus(409);
        }else if((!newregister.country || !newregister.year || 	!newregister.quality_of_life || !newregister.purchacing_power
                       || !newregister.health_care)||Object.keys(newregister).length != 5){
            console.log("Syntax error on new data body");
            res.sendStatus(400);
        }else{
            db.insert(newregister);
            res.sendStatus(201);
        }
    });
});	


//DELETE ONE
app.delete(BASE_API_PATH+"/quality-of-life/:country/:year", (req,res)=>{
	var country1 = req.params.country;
    var year1 = parseInt(req.params.year);
	db.count({$and : [{country : country1}, {year : year1}]},(err,count) => {
        if(err){
            res.sendStatus(500);
        }else if(count==0){
		res.sendStatus(404,"NOT FOUND");
	}else{
		db.find({$and : [{country : country1}, {year : year1}]}, (err,quality_of_life1) =>{
			db.remove({$and : [{country : country1}, {year : year1}]}, {}, (err,quality_of_life1) =>{}); 		
	    });
		res.sendStatus(200,"OK");
	}
});
	
});

//PUT OK
app.put(BASE_API_PATH+"/quality-of-life/:country/:year", (req, res) =>{

    var country1 = req.params.country;
    var year1 = parseInt(req.params.year);
    var up = req.body;
    console.log(up);
    db.find({$and : [{country : country1}, {year : year1}]},(error,quality_of_life1)=>{
        console.log(quality_of_life1);
        if(error){
            res.sendStatus(500);
        }else if(quality_of_life1.length == 0){
            console.log("Error 404, Not Found .");
            res.sendStatus(404);
        }else if((!up.country || !up.year || !up.quality_of_life || !up.purchacing_power
                   || !up.health_care || up.country != country1 )
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
app.post(BASE_API_PATH+"/quality-of-life/:country/:year",(req,res) =>{
    res.sendStatus(405,"METHOD NOT ALLOWED");

});
//fallo PUT base
app.put(BASE_API_PATH+"/quality-of-life",(req,res) =>{
    res.sendStatus(405,"METHOD NOT ALLOWED");

});

//DELETE ALL
    app.delete(BASE_API_PATH+"/quality-of-life", (req,res) =>{
        db.find({}, (err,quality_of_life1) =>{
            if(err){
                res.sendStatus(500);
            }else if(quality_of_life1.length != 0){
                db.remove({},{multi:true},(err,quality_of_life1)=>{		
            });
                res.sendStatus(200,"OK");
            }else{
                res.sendStatus(405,"METHOD NOT ALLOWED");
        }
        });
    });

//DATO A PARTIR DE COUNTRY Y YEAR
app.get(BASE_API_PATH+"/quality-of-life/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = parseInt(req.params.year);

    db.find({"country" :country, "year":year},(error, quality_of_life1)=>{
        if(error){
            res.sendStatus(500);
        }else if(quality_of_life1.length==0){
            console.log("404. Not Found");
            res.sendStatus(404);
        }else{
            
            if(quality_of_life1.length===1){
                delete quality_of_life1[0]._id;
                res.send(JSON.stringify(quality_of_life1[0],null,2));
            
                console.log("Data sent:"+JSON.stringify(quality_of_life1[0],null,2));
            }else{
                quality_of_life1.forEach( (v) => {
                delete v._id;
            });
            res.send(JSON.stringify(quality_of_life1,null,2));
            
                console.log("Data sent:"+JSON.stringify(quality_of_life1,null,2));
            }
            

        
        }
    })
});	

//delete dato country y año
app.delete(BASE_API_PATH+"/quality-of-life/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = parseInt(req.params.year);

    db.find({"country":country, "year":year},(error, quality_of_life1)=>{
        if(error){
            res.sendStatus(500);
        }else if(quality_of_life1.length==0){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.sendStatus(200,"OK");
            db.remove({ "country":country, "year":year }); 
            }
        })
    });	

}