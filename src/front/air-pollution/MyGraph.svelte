
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
</svelte:head>

<main>

<br>
<br>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
        
        </p>
    </figure>  
</main>
<!--<script>
    import {
        onMount
    } from "svelte";
    let paises=[];
    let years = [];
    let dair_pollution = [];
    let dparticulas = [];
    let dhousehold = [];
    let data = [];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("/api/v1/air-pollution");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            let i=0;
            let max=0;
            while(i<data.length){
                paises.push[data[i].country];//MIRAR EL DE ANTONIO Y EL DE ALI. UN ARRAY POR REGISTRO
                dair_pollution.push[data[i].deaths_air_pollution];
                dparticulas.push[data[i].deaths_ambient_particulate_matter_pollution];
                dhousehold.push[data[i].deaths_household_air_pollution_from_solid_fuels];
                years.push[data[i].year];
                
                i++;
            }
            console.log(`We have received ${data.length} data points.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);
  async function loadGraph(){  
    Highcharts.chart('container', {
        title: {
            text: 'My data'
        },
        yAxis: {
            title: {
                text: 'Deaths'
            }
        },
        xAxis: {
            accessibility: {
                rangeDescription: 'Year'
            }, 
            categories: years
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
                pointStart: 2010
            }
        },
        series: [{
            name: 'Deaths by air-pollution',
            data: dair_pollution
        }, 
        {

        }],
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
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>  
</main> -->
