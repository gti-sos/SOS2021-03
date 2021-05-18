
<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    

    

 
    let air_pollution = [];
    let newRegister= {
		"country": "", 
        "year": 0, 
        "deaths_ambient_particulate_matter_pollution": 0, 
        "deaths_household_air_pollution_from_solid_fuels": 0,
        "deaths_air_pollution": 0
	}
    
    const BASE_CONTACT_API_PATH = "/api/v1";

    
    async function getRegisters(){
        console.log("Fetching registers...");
		const res = await fetch("/api/v1/air-pollution");
        
		
		if(res.ok){
			console.log("All OK");
			const json = await res.json();
			air_pollution= json ;
			console.log(`We have ${air_pollution.length} registers.`);
			console.log(JSON.stringify(air_pollution));
		}else{
			console.log("Error!");
		}
    } 

    async function loadGraph(){
        Highcharts.chart('container', {

            title: {
                text: 'Deaths by air-pollution in some countries'
            },

            subtitle: {
                text: 'Source: SOS2021-03/api/v1/air-pollution.com'
            },

            yAxis: {
                title: {
                    text: 'Number of deahts'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 1990 to 2016'
                }
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
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
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
    

    onMount(getRegisters);


    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<main>
    <h2>
        Gráfica de estadísticas:
    </h2>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing stadistics of deaths by air-pollution
        </p>
    </figure>
    
</main>
<style>
    .highcharts-figure, .highcharts-data-table table {
    min-width: 360px; 
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