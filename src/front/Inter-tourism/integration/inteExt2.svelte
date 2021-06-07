<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        onMount
    } from "svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

// Always set FusionCharts as the first parameter
fcRoot(FusionCharts, Charts, FusionTheme);
    var BASE_CONTACT_API_PATH= "/api/v2";
    const paises = new Set();
    
    let Valor = [];
    let data = [];
    let data2=[];
    let dataSource={};

    let numberofarrivals=[];
    let numberofdepartures=[];
    let expendituresbillion=[];
    let pie = [];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms?year=2015");
        const res2 = await fetch("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/36708?tip=AM/Data");
        if(res.ok ){
            console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            console.log(data2);
            let i=0;
            let e=0;
            while(e<data.length){    
               
                    pie.push({label: data[e].country, value:data[e].expendituresbillion});
                
                e++;
            }
            console.log(numberofarrivals);
            console.log(expendituresbillion);
            console.log(numberofdepartures);
            while(i<5){
    
                pie.push({label: data2[i].Nombre, value:data2[i].Data[0].Valor*100});
            
                i++;
            
            }             
            console.log(Valor);
           
                
            //console.log(dict);
        }else{
            console.log("Error!");
        }
        loadGraph();
        
    }   
    onMount(getData);

    dataSource = {
        "chart": {
            "caption": "Integración con",
            "subcaption": "población mayor de cierta edad por año",
            "showvalues": "1",
            "showpercentintooltip": "0",
            "numberprefix": "$",
            "enablemultislicing": "1",
            "theme": "fusion"
        },
        "data": pie
        };
    var chartConfigs={};
    async function loadGraph(){  
    
        chartConfigs = {
        type: 'pie3d',
        width: 1800,
        height: 700,
        dataFormat: 'json',
        dataSource
        };
    }
</script>
<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>
<main>
    <br>
        <Button outline color="secondary" onclick="window.location.href='#/integrations'">Volver</Button>
        <SvelteFC {...chartConfigs} />
</main>