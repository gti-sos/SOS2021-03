<script>
    import Button from "sveltestrap/src/Button.svelte"
    import {
        onMount
    } from "svelte";
    var registrosAirPollution = [];
    var diccAP = {};
    var data1  =[];
    var lista = [];


    
    async function getRegisters(){
        console.log("Fetching air death's pollution data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v1/air-pollution");
        if (res.ok) {
            const json = await res.json();
            registrosAirPollution = json;
            let i =0;
            while(i<registrosAirPollution.length){
                if(registrosAirPollution[i].year==2011){
                    lista.push({"name":registrosAirPollution[i].country,"value":registrosAirPollution[i].deaths_air_pollution});
                }
                i++;
            }
            console.log(`We have received ${registrosAirPollution.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        
        /*
        console.log("Fetching obesity data...");
        const res1 = await fetch("https://sos2021-03.herokuapp.com/api/v1/obesity");
        if (res1.ok) {
            const json2 = await res1.json();
            registrosObesity = json2;
            console.log(`We have received ${registrosObesity.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }*/
        console.log(lista);
        loadGraph2();
        
    }

    

    async function loadGraph2(){  
      console.log("grafica")
      Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Carbon emissions around the world (2014)'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Europe',
        data: lista
        
    }]
});


    
        
    
    }
    onMount(getRegisters);
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<main>
    <h2>
        Integración con API de Obesidad
    </h2>
    <br>
    <br>
    <br>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Packed bubble charts are visualizations where the size and optionally
            the color of the bubbles are used to visualize the data. The positioning
            of the bubbles is not significant, but is optimized for compactness.
            Try dragging the bubbles in this chart around, and see the effects.
        </p>
    </figure>
    <br>
    <br>
    <br>
    <br>
</main>
<style>
   .highcharts-figure {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
}
</style>