
<script>
	
    import {
        onMount
    } from "svelte";

    

 	
	var BASE_CONTACT_API_PATH= "/api/v1";
	const paises = new Set();
	let years = new Set();
	var dictDeathsAirPollution ={};
	let deathsairpollution = [];
	let anyos2 = [];
	var dictAnyoPais ={};
    var res = [];
	
	
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
           
            
            
            for(let j of years){
                anyos2.push(j);
            }
			console.log("anyos:" + anyos2);
			
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
        loadGraph2();
        console.log("Ya se deberia de haber cargado la grafica");
		
    }   
    
    onMount(getData);
    async function loadGraph(){  
    console.log(dictDeathsAirPollution);
    Highcharts.chart('container', {
        chart: {
        type: 'area'
        },
        title: {
            text: 'Datos de muertes por contaminación del aire'
        },
        yAxis: {
            title: {
                text: 'Muertes por contaminación del aire(en millones)'
            }
        },
        xAxis: {
           categories: Array.from(years).sort()
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
  
  async function loadGraph2(){  
      console.log("grafica 2")
      new Chartist.Bar('.ct-chart', {
        labels: anyos2,
        series: [
            [5, 4, 3, 7, 5],
            [3, 2, 9, 5, 7],
            [1, 5, 8, 4, 5],
            [2, 3, 4, 6, 7],
            [4, 1, 2, 1, 7]
        ]
        }, {
        // Default mobile configuration
        stackBars: true,
        axisX: {
            labelInterpolationFnc: function(value) {
            return value.split(/\s+/).map(function(word) {
                return word[0];
            }).join('');
            }
        },
        axisY: {
            offset: 20
        }
        }, [
        // Options override for media > 400px
        ['screen and (min-width: 400px)', {
            reverseData: true,
            horizontalBars: true,
            axisX: {
            labelInterpolationFnc: Chartist.noop
            },
            axisY: {
            offset: 60
            }
        }],
        // Options override for media > 800px
        ['screen and (min-width: 800px)', {
            stackBars: false,
            seriesBarDistance: 10
        }],
        // Options override for media > 1000px
        ['screen and (min-width: 1000px)', {
            reverseData: false,
            horizontalBars: false,
            seriesBarDistance: 15
        }]
        ])
        /*
        var chart = new Chartist.Line('.ct-chart', {
        labels: anyos2.sort(),
        series: deathsairpollution
        }, {
        fullWidth: false,
        chartPadding: {
            right: 10
        },
        showArea: true,
        lineSmooth: Chartist.Interpolation.cardinal({
            fillHoles: true,
        }),
        low: 0
        });
        console.log("anyossss:" + anyos2)
        console.log(deathsairpollution)*/
    
  }


    
</script>

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" ></script>
</svelte:head>

<main>

<br>
<br>
    
    <div>
        <h5>
            Gráfica Highchart
        </h5>
        <figure class="highcharts-figure c">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
        </figure>
    </div>
            
    <div>
        <h5>
            Gráfica con Chartist
        </h5>
        
        <div class="ct-chart ct-perfect-fourth c"></div>
        
        
    </div>
            
        
        
        
      
    
    
    
    
</main>
<style>
    .c { 
        width: 50%; 
       
    }
    
</style>