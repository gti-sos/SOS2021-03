<script>
    import Button from "sveltestrap/src/Button.svelte"
    import {
        onMount
    } from "svelte";
    var registrosAirPollution = [];
    var registrosInterTourism = [];
    var diccAP = {};
    var data1  =[];
    var lista = [];
    var listaI = [];


    
    async function getRegisters(){
        console.log("Fetching air death's pollution data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v1/air-pollution");
        const res2 = await fetch("https://sos2021-03.herokuapp.com/api/v2/international-tourisms");
        if (res.ok && res2.ok) {
            const json = await res.json();
            const jsoninter = await res2.json();
            registrosAirPollution = json;
            registrosInterTourism = jsoninter;
            let i =0;
            let j=0;
            while(i<registrosAirPollution.length){
                lista.push({"name":registrosAirPollution[i].country+" "+ registrosAirPollution[i].year,"value":registrosAirPollution[i].deaths_air_pollution});
                i++;
            }
            console.log(`We have received ${registrosAirPollution.length} stats.`);
            
            while(j<registrosInterTourism.length){
                listaI.push({"name":registrosInterTourism[j].country+" "+registrosInterTourism[j].year,"value":registrosInterTourism[j].numberofarrivals});
                j++;
            }
            console.log(`We have received ${registrosInterTourism.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        
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
        text: 'Gráfica conjunta del equipo de trabajo SOS2021-03'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value} llegadas/millones de muertes por contaminación del aire<sub>2</sub>'
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
        name: 'Muertes por contaminación del Aire',
        data: lista
        
    },
    {
        name: 'Número de llegadas aéreas, turismo internacional',
        data: listaI
        
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
        Gráfica conjunta
    </h2>
    <br>
    <br>
    <br>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Aquí pueden verse las muertes por contaminación del aire comparadas con las estadísticas de turismo internacional en el año 2011.
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