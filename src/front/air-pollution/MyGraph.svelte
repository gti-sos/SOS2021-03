
<script>
	
    import {
        onMount
    } from "svelte";
 	
	var BASE_CONTACT_API_PATH= "/api/v1";
	const paises = new Set();
	let years = new Set();
	var dictDeathsAirPollution ={};
	let deathsairpollution = [];
	
	var dictAnyoPais ={};
	
	
    let data = [];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/air-pollution");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
			let i=0;
			data.reverse();
			while(i<data.length){
				years.add(data[i].year);
				if(dictDeathsAirPollution[data[i].country]){
					dictDeathsAirPollution[data[i].country].push(data[i].deaths_air_pollution);
				}
				else{
					dictDeathsAirPollution[data[i].country]=[parseInt(data[i].deaths_air_pollution)];
				}
				
				
				
				
				if(dictAnyoPais[data[i].country]){
					dictAnyoPais[data[i].country].push(data[i].year);
				}
				else{
					dictAnyoPais[data[i].country]=[parseInt(data[i].year)];
				}
				i++;
			}
			console.log(dictDeathsAirPollution);
			
			
        }else{
            console.log("Error!");
        }
		let paises= Object.keys(dictDeathsAirPollution);
		for(let p=0; p<paises.length; p++){
			if(dictAnyoPais[paises[p]]){
				let anyos=dictAnyoPais[paises[p]].sort();
				let a=0;
					while(a<Array.from(years).length){
						let ord =Array.from(years).sort();
						if(!anyos.includes(ord[a])){
							dictDeathsAirPollution[paises[p]].splice(a, 0, null);
						}
						a++
					}
			}
		}
	
		Object.entries(dictDeathsAirPollution).forEach(([key, value]) => {
			
				deathsairpollution.push({name: key , data: value})
			});
		loadGraph();
        console.log("Ya se deberia de haber cargado la grafica");
		
    }   
    
    onMount(getData);
    async function loadGraph(){  
    console.log(dictDeathsAirPollution);
    Highcharts.chart('container', {
        title: {
            text: 'Datos de muertes por contaminación del aire'
        },
        yAxis: {
            title: {
                text: 'Muertes por contaminación del aire(en millones)'
            }
        },
        xAxis: {
           categories: Array.from(years)
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
        series: deathsairpollution,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
        
    });
    
  }

  
    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
</svelte:head>

<main>

<br>
<br>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
        
    </figure>  
    <div class="ct-chart ct-perfect-fourth"></div>
    <script>
        var data1 = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
        };

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        var myChart = new Chartist.Line('.ct-chart', data1);
    </script>
</main>
