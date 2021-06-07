<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        onMount
    } from "svelte";
    var BASE_CONTACT_API_PATH= "/api/v2";
    const paises = new Set();
    
    let caloryperperson = [];
    let dailycalory = [];
    let dailygram = [];
    let data = [];
    let data2=[];

    let numberofarrivals=[];
    let numberofdepartures=[];
    let expendituresbillion=[];
    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms?year=2011");
        const res2 = await fetch("https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats?year=2011");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            let i=0;
            let e=0;
            while(e<data.length){    
                    
                    numberofarrivals.push({x: data[e].country, y:data[e].numberofarrivals});
                    numberofdepartures.push({x: data[e].country, y:data[e].numberofdepartures});
                    expendituresbillion.push({x: data[e].country, y:data[e].expendituresbillion});
                e++;
            }
            while(i<data2.length){
                dailycalory.push({x: data2[i].country, y:data2[i].dailycalory});
                caloryperperson.push({x: data2[i].country, y:data2[i].caloryperperson});
                dailygram.push({x: data2[i].country, y:data2[i].dailygram});
                
                i++;
            
            }             
    console.log(numberofdepartures)
                
            //console.log(dict);
        }else{
            console.log("Error!");
        }
        loadGraph();
        
    }   
    onMount(getData);
    async function loadGraph(){  
    
        var chart = JSC.Chart('chartDiv', {
        debug: true,
        type: 'horizontalColumn',
        title_label_text: 'Integración con consumo de comida',
        yAxis: { label_text: 'Cantidad' },
        xAxis_label_text: 'Países',
        series: [
        {
            name: 'Número de llegadas',
            points: numberofarrivals
        },
        {
            name: 'Número de salidas',
            points: numberofdepartures
        },
        {
            name: 'Gastos',
            points: expendituresbillion
        },
        {
            name: 'Calorías diarias',
            points: dailycalory
        },
        {
            name: 'Gramos diarios',
            points: dailygram
        },
        {
            name: 'Calorías por persona',
            points: caloryperperson
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