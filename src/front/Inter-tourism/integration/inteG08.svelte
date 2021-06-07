<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        onMount
    } from "svelte";
    var BASE_CONTACT_API_PATH= "/api/v2";
    const paises = new Set();
    
    let negative = [];
    let positive = [];
    let totalsamples = [];
    let data = [];
    let data2=[];

    let numberofarrivals=[];
    let numberofdepartures=[];
    let expendituresbillion=[];
    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms");
        const res2 = await fetch("https://sos2021-08.herokuapp.com/api/v1/statewisetestingdetails");
        if(res.ok ){
            console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            let i=0;
            let e=0;
            while(e<data.length){    
                if(data[e].country=="India"){
                    numberofarrivals.push({x: data[e].country, y:data[e].numberofarrivals});
                    numberofdepartures.push({x: data[e].country, y:data[e].numberofdepartures});
                    expendituresbillion.push({x: data[e].country, y:data[e].expendituresbillion});
                }
                e++;
            }
            while(i<data2.length){
                negative.push({x: data2[i].state, y:data2[i].negative});
                positive.push({x: data2[i].state, y:data2[i].positive});
                totalsamples.push({x: data2[i].state, y:data2[i].totalsamples});
                
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
        type: 'column rounded',
        title_label_text: 'Integración con datos de COVID en la India',
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
            name: 'Negativos',
            points: negative
        },
        {
            name: 'Positivos',
            points: positive
        },
        {
            name: 'Total de muestras',
            points: totalsamples
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
        <div id="chartDiv" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
</main>