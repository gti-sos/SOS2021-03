
////////////////////////////////////////////////////////
//INTERNATIONAL-TOURISMS
////////////////////////////////////////////////////////
module.exports.register = (app) => {
    var BASE_API_PATH = "/api/v1";
    var Datastore = require("nedb");
    var path = require("path");
    const dbFileName = path.join(__dirname, "inteTourism.db");
    var db = new Datastore({
        filename: dbFileName, 
        autoload: true
    });

    var inter_tourisms = [];
    var inter_tourisms_initial = [
        {
            "country":"portugal",
            "year":2014,
            "numberofarribals":10497000,
            "numberofdepartures":1502000,
            "expendituresbillion":5213 
        },
        {
            "country":"rusian-federation",
            "year":2010,
            "numberofarribals":22281000,
            "numberofdepartures":39232000,
            "expendituresbillion":30169
        },
        {
            "country":"francia",
            "year":2014,
            "numberofarribals":206599000,
            "numberofdepartures":31941000,
            "expendituresbillion":58464
        }
    ];

    db.insert(inter_tourisms);

    //GET load initial data
    app.get(BASE_API_PATH+"/international-tourisms/loadInitialData", (req, res)=>{   
        var fichero = db.getAllData();
        if(fichero.length>=1){
            res.sendStatus(409, "ALREADY EXIST(la base se encuentra llena o con elementos)");
            console.log("There is already loaded data");
        }else{
            db.insert(inter_tourisms_initial);
            res.sendStatus(200);
            console.log("Initial Countries for International Tourisms "+JSON.stringify(inter_tourisms_initial,null,2))
        }
    });
    
    //GET todo, paginación y búsquedas
    app.get(BASE_API_PATH+"/international-tourisms", (req, res)=>{
        var limit = req.query.limit;
        var offset = req.query.offset;
        console.log("limit="+limit+", offset="+offset);

        var country = req.query.country;
        var year = parseInt(req.query.year);
        var numberofarribals = parseInt(req.query.numberofarribals);
        var numberofdepartures = parseInt(req.query.numberofdepartures);
        var expendituresbillion = parseInt(req.query.expendituresbillion);

        var fromYear = parseInt(req.query.fromYear);
        var toYear = parseInt(req.query.toYear);
        console.log("country="+country+", year="+year+", numberofarribals="+numberofarribals+", numberofdepartures="+numberofdepartures+", expendituresbillion="+expendituresbillion+", fromYear="+fromYear+", toYear="+toYear);

        if(country){
            db.find({country: country}).skip(offset).limit(limit).exec(  (err, inter_tourismsInDB) => {
                if(err){
                    console.error("ERROR accesing a DB in GET: " + err);
                    res.sendStats(500);
                } else{
                    if(inter_tourismsInDB.lengh === 1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    } 
                }
            });    
        }else if(year){
            db.find({year: year}).skip(offset).limit(limit).exec(  (err, inter_tourismsInDB) => {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }   
                }
            });
        }else if(numberofarribals){
            db.find({numberofarribals: numberofarribals}).skip(offset).limit(limit).exec(  (err, inter_tourismsInDB) => {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));

                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }
                
                }
            });
        }else if(numberofdepartures){
            db.find({numberofdepartures: numberofdepartures}).skip(offset).limit(limit).exec( function (err, inter_tourismsInDB)  {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }                    
                }
            });
        }else if(expendituresbillion){
            db.find({expendituresbillion: expendituresbillion}).skip(offset).limit(limit).exec(  (err, inter_tourismsInDB) =>{
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }    
                }
            });
        }else if(fromYear && toYear){
            db.find({year: {$gte: fromYear, $lt: toYear}}).sort({year: 1}).skip(offset).limit(limit).exec(function(err, inter_tourismsInDB) {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                        
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }   
                }
            });
        var x = country | year | numberofarribals | numberofdepartures | expendituresbillion;
        var y = country | year | numberofarribals | numberofdepartures | expendituresbillion;
        }else if(x && y){
            if(x!=y){
                db.find({x: {$gte: x, $lt: y}}).sort({x: 1}).skip(offset).limit(limit).exec(function(err, inter_tourismsInDB) {
                    if(err){
                        res.sendStatus(500);
                    }else {
                        if(inter_tourismsInDB.length===1){
                            delete inter_tourismsInDB[0]._id;
                            res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                        
                            console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                        }else{
                            inter_tourismsInDB.forEach( (v) => {
                                delete v._id;
                            });
                            res.send(JSON.stringify(inter_tourismsInDB,null,2));
                            
                            console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                        }   
                    }
                });
            }else{
                res.sendStatus(500);
            }
        }else{
            db.find({}).skip(offset).limit(limit).exec( (err, inter_tourismsInDB) => {
                if(err){
                    res.sendStatus(500);
                }else {
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }
                }
            });
        }
    });
 
    //hacer un post
    app.post(BASE_API_PATH+"/international-tourisms", (req,res)=>{
        var newRegister = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);
        db.find({$and : [{country : country}, {year : year}]},(err, inter_tourismsInDB)=>{
            if(err){
                console.error("ERROR accesing a DB in GET: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            } 
            else if(inter_tourismsInDB.length != 0){
                console.log("409.ALREADY EXIST");
                res.sendStatus(409, "ALREADY EXIST"); //CONFLICT
            }else if((!newRegister.country || !newRegister.year || 	!newRegister.numberofarribals || !newRegister.numberofdepartures || !newRegister.expendituresbillion)||Object.keys(newRegister).length != 5){
                console.log("Syntax error on new data body");
                res.sendStatus(400);
            }else {
                console.log("Inserting new country in db: " + JSON.stringify(country, null, 2));
                db.insert(newRegister);
                res.sendStatus(201, "CREATED"); //CREATED
            }
        }); 
    });
    

    //GET pais y fecha
    app.get(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        country = req.params.country;
        year = parseInt(req.params.year);
        db.find({country: country, year: year}, (err, inter_tourismsInDB)=> {
            if(err){
                console.error("ERROR accesing a DB in GET: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            }else{
                if(inter_tourismsInDB.length==0){
                    console.log("404. Not Found");
                    res.sendStatus(404); 
                }else{
                    if(inter_tourismsInDB.length===1){
                        delete inter_tourismsInDB[0]._id;
                        res.send(JSON.stringify(inter_tourismsInDB[0],null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB[0],null,2));
                    }else{
                        inter_tourismsInDB.forEach( (v) => {
                            delete v._id;
                        });
                        res.send(JSON.stringify(inter_tourismsInDB,null,2));
                    
                        console.log("Data sent:"+JSON.stringify(inter_tourismsInDB,null,2));
                    }
                }
            }
        });
        
    });
    

   // DELETE todo
    app.delete(BASE_API_PATH+"/international-tourisms", (req,res)=>{
        db.remove({}, {multi:true}, (err, numCountrysRemoved)=>{
            if(err){
                console.error("ERROR accesing a DB countrys in DELETE: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            }else{
                if(numCountrysRemoved == 0){
                    res.sendStatus(404, "NOT FOUND"); //NOT FOUND
                }else{
                    res.sendStatus(200, "OK"); //OK
                }
            }
        });
    });

    //PUT TODO ERROR
    app.put(BASE_API_PATH+"/international-tourisms",(req, res)=>{
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    //POST PAIS Y AÑO ERROR
    app.post(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });
    
    //PUT pais y año
    app.put(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        var countryMod = req.params.country;
        var yearMod = parseInt(req.params.year);
        var update = req.body;
        db.find({$and : [{country : countryMod}, {year : yearMod}]}, (err, inter_tourismsInDB ) => {
            if(err){
                console.error("ERROR accesing a DB countrys in PUT: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            }else if (inter_tourismsInDB == 0){
                console.log("Error 404, Not Found .");
				res.sendStatus(404);
            }else if((!update.country || !update.year || !update.numberofarribals || !update.numberofdepartures 
                || !update.expendituresbillion || update.country != countryMod) 
                || Object.keys(update).length !=5
                ){
                    res.sendStatus(409);
            }else{
                db.update({$and : [{country : countryMod}, {year : yearMod}]},{$set: update});
                console.log("Update " + update.country);
                res.sendStatus(200);
            }
        });
    });

    //DELETE pais y fecha
    app.delete(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        var countryTBDeleted = req.params.country;
        var yearTBDeleted = parseInt(req.params.year);
        db.remove({$and:[{country: countryTBDeleted}, {year: yearTBDeleted}]}, {}, (err, numCountrysRemoved) => {
            if(err){
                console.error("ERROR accesing a DB countrys in DELETE: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            }else{
                if(numCountrysRemoved == 0){
                    res.sendStatus(404, "NOT FOUND"); //NOT FOUND
                }else{
                    res.sendStatus(200, "OK"); //OK
                }
            }
        });
    });   
};
