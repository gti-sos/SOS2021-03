<script>
    import Button from "sveltestrap/src/Button.svelte"
    import {
        onMount
    } from "svelte";
    var registrosAirPollution = [];
    var registrosObesity = [];
    var paises = new Set();
    var lac = [];
    var lob = [];
    var paises2 = [];


    paises.add("GERMANY"); 
    paises.add("INDIA");
    paises.add("CHINA");
    async function getRegisters(){
        console.log("Fetching air death's pollution data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v1/air-pollution");
        if (res.ok) {
            const json = await res.json();
            registrosAirPollution = json;
            console.log(`We have received ${registrosAirPollution.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        console.log("Fetching obesity data...");
        const res1 = await fetch("https://sos2021-03.herokuapp.com/api/v1/obesity");
        if (res1.ok) {
            const json2 = await res1.json();
            registrosObesity = json2;
            console.log(`We have received ${registrosObesity.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad(){
        await getRegisters();
        
        var registrosAP = [];
        var registrosOB = [];
        var diccAP = {};
        var diccOB = {};
        
        
        
        registrosObesity.forEach((d)=>{
            var a = [d.country.toUpperCase(), d.woman_percent*d.total_population/1000];
            if(Array.from(paises).includes(d.country.toUpperCase())&&d.year==2011){
                registrosOB.push(a);
                diccOB[d.country.toUpperCase()]=[d.woman_percent*d.total_population/1000];
                paises2.push(d.country.toUpperCase());
            }
            
        });
        
        console.log("Paises: " + Array.from(paises));
        registrosAirPollution.forEach((c)=>{
            
            if(Array.from(paises).includes(c.country.toUpperCase())&&c.year==2011){
                var r = [c.country.toUpperCase(), c.deaths_air_pollution*10000];
                registrosAP.push(r);
                diccAP[c.country.toUpperCase()]=[c.deaths_air_pollution*10000];
            }
            
        });
        console.log("decc OB: ");
        console.log(diccOB);
        console.log("decc AP: ");
        console.log(diccAP);

        Object.entries(diccOB).forEach(([key, value]) => {
            
            lob.push(value)
            
        });
        Object.entries(diccAP).forEach(([key, value]) => {
            
            lac.push(-value)
            
        });
        console.log("ap")
        console.log(lac);
        console.log("ob");
        console.log(lob);
        loadGraph2();

    }

    async function loadGraph2(){  
      console.log("grafica")
      var categories = paises2;

    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Muertes por conteminación de aire vs. Casos de obesidad en 2011'
        },
        subtitle: {
            text: 'Source: <a href="https://sos2021-03.herokuapp.com/api/v1/obesity">API de obesidad integrada con Proxy</a>'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: ''
            }
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Casos de obesidad'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Muertes por contaminación del aire'
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value);
                }
            },
            accessibility: {
                description: 'Population',
                rangeDescription: ''
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', pais ' + this.point.category + '</b><br/>' +
                    'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) ;
            }
        },

        series: [{
            name: 'Muertes por contaminación del aire',
            data: lac
        }, {
            name: 'Casos de obesidad',
            data: lob
        }]
    });

        
    
    }
    onMount(onLoad);
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<main>
    <h2>
        Integración con API de Obesidad
    </h2>
    <br>
    <br>
    <br>
    
    <figure class="highcharts-figure c">
        <div id="container"></div>
        <p class="highcharts-description centro">
            
            Comparativa de casos de muerte por contaminación del aire <br>
            
            vs. <br>
            
            Casos de obesidad en ciertos paises en el año 2011. <br>
            
            (Integración realizada a través de proxy)
        </p>
    </figure>
    <br>
    <br>
    <br>
    <br>
</main>
<style>
    .centro{
        text-align:center;
    }
    .c { 
        width: 75%; 
        height: 512px;
        margin-left: auto;
        margin-right: auto;
    }
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