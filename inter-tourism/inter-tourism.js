
////////////////////////////////////////////////////////
//INTERNATIONAL-TOURISMS
////////////////////////////////////////////////////////

var BASE_API_PATH = "/api/v1";
var Datastore = require("nedb");
var db = new Datastore;

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

module.exports.register = (app) => {

    //GET
    app.get(BASE_API_PATH+"/international-tourisms", (req, res)=>{
        db.find({}, (err, inter_tourismsInDB)=>{
            if(err){
                console.error("ERROR accesing a DB in GET: " + err);
                res.sendStats(500);
            } else{
                var interToSend = inter_tourismsInDB.map((i)=>{
                    //We skip the "_id" field
                    return {country : i.country, year : i.year, numberofarribals : i.numberofarribals, numberofdepartures : i.numberofdepartures, expendituresbillion : i.expendituresbillion};
                });
                res.send(JSON.stringify(interToSend, null, 2));
            }
        });
    
    });
    

    
    app.get(BASE_API_PATH+"/international-tourisms/loadInitialData", (req, res)=>{   
            db.insert(inter_tourisms_initial);
            res.send("Loaded Initial Data");
       
    });
    


    app.post(BASE_API_PATH+"/international-tourisms", (req,res)=>{
        var newCountry = req.body;
        db.find({name : newCountry.name}, (err, inter_tourismsInDB)=>{
            if(err){
                console.error("ERROR accesing a DB in GET: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            } else{
                if(inter_tourismsInDB.length == 0){
                    console.log("Inserting new country in db: " + JSON.stringify(newCountry, null, 2));
                    db.insert(newCountry);
                    res.sendStatus(201); //CREATED
                }else {
                    res.sendStats(409); //CONFLICT
                }
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
            } else{
                if(inter_tourismsInDB.length == 0){
                    res.sendStatus(404); 
                }else{
                    var interToSend = inter_tourismsInDB.map((i)=>{
                        //We skip the "_id" field
                        return {country : i.country, year : i.year, numberofarribals : i.numberofarribals, numberofdepartures : i.numberofdepartures, expendituresbillion : i.expendituresbillion};
                    });
                    res.send(JSON.stringify(interToSend, null, 2));
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
                    res.sendStatus(404); //NOT FOUND
                }else{
                    res.sendStatus(200); //OK
                }
            }
        });
    });

    //PUT TODO ERROR
    app.put(BASE_API_PATH+"/international-tourisms",(req, res)=>{
        res.sendStatus(405);
    });

    //POST PAIS Y AÑO ERROR
    app.post(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        res.sendStatus(405);
    });
    
    //PUT pais y año
    app.put(BASE_API_PATH+"/international-tourisms/:country/:year",(req, res)=>{
        var countryMod = req.params.country;
        var yearMod = parseInt(req.params.year);
        var update = req.body;
        db.update({$and : [{country : countryMod}, {year : yearMod}]}, {$set: {update}}, {}, (err, countryUpdate) => {
            if(err){
                console.error("ERROR accesing a DB countrys in PUT: " + err);
                res.sendStatus(500); //INTERNAL SERVER ERROR
            }else{
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
                    res.sendStatus(404); //NOT FOUND
                }else{
                    res.sendStatus(200); //OK
                }
            }
        });
    });   
};