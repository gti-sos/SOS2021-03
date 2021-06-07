<script>
    import Button from "sveltestrap/src/Button.svelte";
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    import {
        onMount
    } from "svelte";
    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    
    var dataSource ={};


    var registrosInterTourism = [];
    var registrosEducation = [];
    var listaI = [];
    var listaE = [];
    var paises = new Set();
    var paisesI = [];
    
    var BASE_CONTACT_API_PATH= "/api/v2";
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms?year=2015");
        const res2 = await fetch("https://education-expenditures.herokuapp.com/api/v1");
      
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            const jsonE = await res2.json();

            registrosInterTourism = json;
            registrosEducation = jsonE;
            let e=0;
            let o=0;
            while(e<registrosInterTourism.length){
             
                listaI.push({"value":registrosInterTourism[e].expendituresbillion});
                paises.add({"label" : registrosInterTourism[e].country});
                e++;
            }
            while(o<registrosEducation.length){
                if(registrosEducation[o].year == 2015){
                    paises.add({"label" : registrosEducation[o].country});
                    listaE.push({"value":registrosEducation[o].education_expenditure_per_millions});
                }
                o++;
            }
            
            console.log(registrosInterTourism);
            console.log(paisesI);
            console.log(listaI);
            
            console.log(registrosEducation);
            console.log(paises);
            console.log(listaE);
		
        }else{
            console.log("Error!");
        }
        
        ;

       var pais = [...paises];
       pais.length = pais.length-3;
    
        console.log(pais);

    dataSource = {
        "chart": {
        "caption": "Educación vs Turismo Aéreo Gastos",
        "numbersuffix": " $|€",
        "formatnumberscale": "0",
        "showvalues": "0",
        "drawcrossline": "1",
        "showsum": "1",
        "plottooltext": "$dataValue from $seriesName",
        "theme": "fusion"
    },
    "categories": [
    {
      "category":  pais
    
    }],
    "dataset": [
    {
      "seriesname": "Gastos en Educacion",
      "data": listaE
    },
    {
      "seriesname": "Gastos en Turismo",
      "data": listaI
    }]
    };
    console.log("datos cargados fusion");
    
   

     
        
    loadGraphFusion();
    
    };
  
    onMount(getData);

    

    var chartConfigs={};
    
    async function loadGraphFusion(){
        chartConfigs = {
        type: 'stackedarea2d',
        width: 800,
        height: 500,
        dataFormat: 'json',
        dataSource
        };
    }
    
    
</script>

<main>
    <br>
    
    <Button outline color="secondary" onclick="window.location.href='#/integrations'">Volver</Button>
    <br>
    <br>  
    <div style="margin:auto;"> 
    <SvelteFC {...chartConfigs}/>
      
    </div>
   
  </main>
