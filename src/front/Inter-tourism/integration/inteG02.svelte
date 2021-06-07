<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        onMount
    } from "svelte";
    var BASE_CONTACT_API_PATH= "/api/v2";
    const paises = new Set();
    
    let data = [];
    let data2=[];


    let piramide =[];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms?year=2011");
        const res2 = await fetch("https://sos2021-03.herokuapp.com/api/v2/nuts-production-stats?year=2011");
        if(res.ok && res2.ok){
            console.log("Ok.");
            const json = await res.json();
            console.log(res2.json);
            const json2 = await res2.json();
            
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            let i=0;
            let e=0;
            while(e<data.length){    
                 if(data[e].country == "Greece"){   
                    //piramide.push({name: 'Número de llegadas', y:data[e].numberofarrivals});
                    //piramide.push({name: 'Número de salidas', y:data[e].numberofdepartures});
                    piramide.push({name: 'Gastos en turismo', y:data[e].expendituresbillion});
                }
                e++;
            }
            while(i<data2.length){
                if(data2[i].country == "Greece"){ 
                    piramide.push({name: "Nuez", y:data2[i].walnut});
                    piramide.push({name: "Almendra", y:data2[i].almond});
                    piramide.push({name: "Pistacho", y:data2[i].pistachio});
                }   
                i++;
            
            }             
   
        }
         if(res.ok && res2.ok){
            console.log("Ok.");
            const json = await res.json();
            console.log(res2.json);
            const json2 = await res2.json();
            
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            let i=0;
            let e=0;
            while(e<data.length){    
                 if(data[e].country == "Greece"){   
                    //piramide.push({name: 'Número de llegadas', y:data[e].numberofarrivals});
                    //piramide.push({name: 'Número de salidas', y:data[e].numberofdepartures});
                    piramide.push({name: 'Gastos en turismo', y:data[e].expendituresbillion});
                }
                e++;
            }
            while(i<data2.length){
                if(data2[i].country == "Greece"){ 
                    piramide.push({name: "Nuez", y:data2[i].walnut});
                    piramide.push({name: "Almendra", y:data2[i].almond});
                    piramide.push({name: "Pistacho", y:data2[i].pistachio});
                }   
                i++;
            
            }             
   
        }else{
            console.log("Error!");
        }
        loadGraph();
        
    }   
    onMount(getData);
    async function loadGraph(){  
    
        var chart = JSC.Chart('chartDiv', {
        debug: true,
        type: 'coneInverted',
        legend: { 
            position: 'inside bottom', 
            outline_width: 0 
        }, 
        title: { 
            label_text: 'Integración con frutos secos en 2011 en Grecia', 
            position: 'center'
        }, 
        
        yAxis: { 
           
            label_text: 'Gastos', 
            formatString: 'c'
        }, 
        defaultSeries: { 
            shape_innerPadding: 6, 
            defaultPoint: { label_text: '%name' } 
        },  
        series: [
            {
            name: 'Gastos', 
            palette: 'default',
            points: piramide
        
            }
        ]
        });
    }
</script>
<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>
<main>
    <br>
        <Button outline color="secondary" onclick="window.location.href='#/integrations'">Volver</Button>
        <div id="chartDiv" style="max-width: 700px;height: 580px;margin: 0 auto"></div>
</main>