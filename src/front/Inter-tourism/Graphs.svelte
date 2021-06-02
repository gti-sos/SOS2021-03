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
	
    let expendituresbillion=[];
    var dictExpendituresbillion={};
    var dataSource ={};
    let anyos2 = [];
    
	
	var dictAnyoPais ={};
    let categoriasAnyos = [];
    let data = [];


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


        for(let a=0; a< years.size; a++){
            let anyos= Array.from(years).sort();
            categoriasAnyos.push({"label" : anyos[a].toString()});
           
  
        }

        var gastosanyos = [];
           Object.entries(dictExpendituresbillion).forEach(([key, value]) => {
                gastosanyos.push({seriesName:key, data:value});
               // expendituresbillion.push({name: key , data:value})
		    });
        console.log(categoriasAnyos);
        console.log(gastosanyos);

        console.log(expendituresbillion);
       

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
    console.log("datos cargados");
    loadGraph();
    };
    
     
    onMount(getData);
    var chartConfigs={};

    async function loadGraph(){
        chartConfigs = {
       type: 'mscolumn2d',
       width: 700,
       height: 500,
       dataFormat: 'json',
       dataSource
        };
    }
</script>
    
<main>
    <br>
    <br>
    <Button outline color="dark" onclick="window.location.href='#/international-tourisms'">Volver</Button>
    <div style="margin:auto;"> 
    <SvelteFC {...chartConfigs}/>
      
    </div>
   
  </main>