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
    var listaI = [];

    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms");
       
      
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
            console.log(data);
			let i=0;
            let j=0;
			data.reverse();
            console.log(data);

            registrosInterTourism = json;
            let e=0;
        
            while(e<registrosInterTourism.length){
                if(registrosInterTourism[e].year==2010){
                    listaI.push([registrosInterTourism[e].country,registrosInterTourism[e].numberofdepartures]);
                }
                e++;
            }
            console.log(`We have received ${registrosInterTourism.length} stats.`);
       

			while(j<data.length){
                pais.add(data[j].country);
				years.add(data[j].year);
               j++;
			}

            while(i<data.length){
                if(dictExpendituresbillion[data[i].country]){
                   
                   if(Array.from(years).includes(data[i].year)){
                       dictExpendituresbillion[data[i].country].push({value:data[i].expendituresbillion});
                   }
                   else{
                       dictExpendituresbillion[data[i].country].push({value:null});
                      
                   }
                   
               }
               else{
                   if(Array.from(years).includes(data[i].year)){
                       dictExpendituresbillion[data[i].country]=[{value:data[i].expendituresbillion}];
                   }
                   else{
                       dictExpendituresbillion[data[i].country]=[{value:null}];
               
                   }
                   
               }
               
               if(dictAnyoPais[data[i].country]){
                   dictAnyoPais[data[i].country].push(data[i].year);
               }
               else{
                   dictAnyoPais[data[i].country]=[parseInt(data[i].year)];
               }
				
				i++;
            }
            
            for(let j of years){
                anyos2.push(j);
            }
			console.log(dictExpendituresbillion);
            console.log(dictAnyoPais)
            
			
        }else{
            console.log("Error!");
        }
		let paises= Object.keys(dictExpendituresbillion);
		for(let p=0; p<paises.length; p++){
			if(dictAnyoPais[paises[p]]){
				let anyos2=dictAnyoPais[paises[p]];
				let a=0;
					while(a<Array.from(years).length){
						let ord =Array.from(years).sort();
                        
						if(!anyos2.includes(ord[a])){
							dictExpendituresbillion[paises[p]].splice(a, 0, null);
						}
						a++
					}
			}
		}
        console.log(dictExpendituresbillion);
    

        for(let a=0; a< years.size; a++){
            let anyos= Array.from(years).sort();
            categoriasAnyos.push({"label" : anyos[a].toString()});
           
  
        }

        var gastosanyos = [];
           Object.entries(dictExpendituresbillion).forEach(([key, value]) => {
                gastosanyos.push({seriesName:key, data:value});
               
		    });
        console.log(categoriasAnyos);
        console.log(gastosanyos);

       

    dataSource = {
      "chart": {
        "caption": "Turismo Internacional Fusioncharts",
        "subcaption": "Gastos por país y año",
        "xaxisname": "Años",
        "yaxisname": "Número total de gastos",
        "formatnumberscale": "1",
        "plottooltext": "<b>$dataValue</b> gastos en <b>$seriesName</b> en el año $label",
        "theme": "fusion",
        "drawcrossline": "1"
      },
      "categories": [
        {
          "category": categoriasAnyos
        }
      ],
      "dataset": gastosanyos
    };
    console.log("datos cargados fusion");
    
    console.log("datos cargados high");

     
        
    loadGraphFusion();
    loadGraphHigh();
    };
    
     
    onMount(getData);
    var chartConfigs={};
    
    async function loadGraphFusion(){
        chartConfigs = {
       type: 'mscolumn2d',
       width: 700,
       height: 500,
       dataFormat: 'json',
       dataSource
        };
    }
    
    async function loadGraphHigh(){
        Highcharts.chart('container', {
        chart: {
            type: 'pie',
            options3d: {
            enabled: true,
            alpha: 45
            }
        },
        title: {
            text: 'Turismo Internacional Número de LLegadas'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
            innerSize: 100,
            depth: 45
            }
        },
        series: [{
            name: 'Llegadas',
            data: listaI
            }]
        });
        
    }
    
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head> 
<main>
    <br>
    
    <Button outline color="dark" onclick="window.location.href='#/international-tourisms'">Volver</Button>
    <br>
    <br>  
    <div style="margin:auto;"> 
    <SvelteFC {...chartConfigs}/>
      
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
              Este gráfico muestra el número de llegadas a los paises cargados en la api en 2010.
            </p>
          </figure>
    </div>
   
  </main>
  <style>
    #container {
        height: 400px; 
    }

    .highcharts-figure, .highcharts-data-table table {
        min-width: 310px; 
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
    }
    .highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
    }
    .highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
    background: #f1f7ff;
    }

 </style>
