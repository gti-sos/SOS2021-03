<script>
    import Button from "sveltestrap/src/Button.svelte"
    import {
        onMount
    } from "svelte";
    var registrosAirPollution = [];
    var registrosSanity = [];
    var paises = new Set();
    var reg2010 = {};
    var registrosGrafico = [];

    var dicc = {};
    var l1 = [];
    var l2 = [];

    async function getRegisters(){
        console.log("Fetching air death's pollution data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v1/air-pollution");
        if (res.ok) {
            const json = await res.json();
            registrosAirPollution = json;
            console.log(`We have received ${registrosAirPollution.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        console.log("Fetching sanity data...");
        const res1 = await fetch("https://sanity-integration.herokuapp.com/sanity-stats");
        if (res1.ok) {
            const json2 = await res1.json();
            registrosSanity = json2;
            console.log(`We have received ${registrosSanity.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad(){
        await getRegisters();
        var registros = {};
        var registrosAP = [];
        var registrosSNT = [];
        
        
        registrosSanity.forEach((d)=>{
            var a = [d.year, d.country.toUpperCase(), d.hospital_bed/1000000];
            registrosSNT.push(a);
            paises.add(d.country.toUpperCase());
        });
        var paises2= Array.from(paises);
        console.log("Paises" + paises2);
        registrosAirPollution.forEach((c)=>{
            console.log(paises2.includes(c.country.toUpperCase()));
            if(paises2.includes(c.country.toUpperCase())){
                var r = [c.year, c.country.toUpperCase(), c.deaths_air_pollution];
                registrosAP.push(r);
            }
            
        });
        
        console.log(registrosSNT);
        console.log(registrosAP);
        for(let r of registrosAP){
            var k = [r[0], r[1]];
            if(registros[k]){
                registros[k].push(r[2]/10);
            }else{
                registros[k]=[r[2]/10];
            }
        }
        for(let r of registrosSNT){
            var k = [r[0], r[1]];
            if(registros[k]){
                registros[k].push(r[2]);
            }else{
                registros[k]=[r[2]];
            }
        }
        console.log(registros);

        ////
        for(let r of registrosAP){
            var k = [r[0], r[1]];
            if(k[0]==2010){
                if(reg2010[k[1]]){
                    reg2010[k[1]].push(r[2]/10);
                    
                }else{
                    reg2010[k[1]]=[r[2]/10];
                }
                l1.push(r[2]/10);
            }
        }
        for(let r of registrosSNT){
            var k = [r[0], r[1]];
            if(k[0]==2010){
                if(reg2010[k[1]]){
                    reg2010[k[1]].push(r[2]);
                }else{
                    reg2010[k[1]]=[r[2]];
                }
                l2.push(r[2]);
            }
        }
        //////////
        dicc["ap"]=[];
        dicc["sn"]=[];
        Object.entries(reg2010).forEach(([key, value]) => {
			
            dicc["ap"].push(value[0]);
            dicc["sn"].push(value[1]);
            
        });

        Object.entries(dicc).forEach(([key, value]) => {
            
            registrosGrafico.push({name: key , data: value})
            
        });
        
        
        console.log( registrosGrafico);
    
        
        loadGraph2();

    }

    async function loadGraph2(){  
      console.log("grafica")
      new Chartist.Bar('.ct-chart', {
        labels: Array.from(paises),
        series: registrosGrafico
        }, {
        axisX: {
            // On the x-axis start means top and end means bottom
            position: 'start'
        },
        axisY: {
            // On the y-axis start means left and end means right
            position: 'end'
        }
        });

        
    
    }
    onMount(onLoad);
</script>
<main>
    <h2>
        Integración con API de sanidad
    </h2>
    <br>
    <h5>Comparativa del año 2010 de muertes por contaminación del aire vs. Camas de hospital(Por paises)</h5>
    <br>
    <br>
    
    <div class="ct-chart ct-perfect-fourth c"></div>
    <br>
    <br>
    <br>
    <br>
</main>
<style>
    .c { 
        width: 75%; 
        height: 512px;
        margin-left: auto;
        margin-right: auto;
    }
</style>