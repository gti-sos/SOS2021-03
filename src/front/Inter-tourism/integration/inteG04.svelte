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
    
    var BASE_CONTACT_API_PATH= "/api/v2";
	var pais = new Set();
	let years = new Set();
	
    var dictExpendituresbillion={};
    var dataSource ={};
    let anyos2 = [];
    
	
	var dictAnyoPais ={};
    let categoriasAnyos = [];
    let data = [];

    var registrosInterTourism = [];
    var registrosEducation = [];
    var listaI = [];
    var listaE = [];

    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v2/international-tourisms");
        const res2 = await fetch("https://education-expenditures.herokuapp.com/api/v1/reduced");
      
        if(res.ok && res2.ok){
            console.log("Ok.");
            const json = await res.json();
            const jsonE = await res2.json();

            registrosInterTourism = json;
            registrosEducation = jsonE;
            let e=0;
            let i=0;
            
            while(e<registrosInterTourism.length){
               
                listaI.push({"seriesName":registrosInterTourism[e].country,"data":registrosInterTourism[e].expendituresbillion});
                
                e++;
            }
            console.log(registrosInterTourism);
            
            while(i<registrosEducation.length){
               
               listaI.push({"seriesName":registrosEducation[i].country,"data":registrosEducation[i].education_expenditure_per_millions});
               
               i++;
           }
           console.log(registrosEducation);
            
		
        }else{
            console.log("Error!");
        }
		     
    
        let paises=[];
        for(let a=0; a< paises.size; a++){
            let anyos= Array.from(years).sort();
            let paises=Array.from(paises);
            categoriasAnyos.push({"label" : paises[a].toString()});
           
  
        }

        
        console.log(categoriasAnyos);
        //console.log(gastosanyos);

        var gastos = [];
           Object.entries(listaI).forEach(([key, value]) => {
                gastos.push({seriesName:key, data:value});
               
		    });

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
        "category": categoriasAnyos
        }
    ],
    "dataset": gastos
    };
    console.log("datos cargados fusion");
    
   

     
        
    loadGraphFusion();
    
    };
    
     
    onMount(getData);
    var chartConfigs={};
    
    async function loadGraphFusion(){
        chartConfigs = {
        type: 'stackedarea2d',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource
        };
    }
    
    
</script>

<main>
    <br>
    
    <Button outline color="dark" onclick="window.location.href='#/international-tourisms'">Volver</Button>
    <br>
    <br>  
    <div style="margin:auto;"> 
    <SvelteFC {...chartConfigs}/>
      
    </div>
   
  </main>
