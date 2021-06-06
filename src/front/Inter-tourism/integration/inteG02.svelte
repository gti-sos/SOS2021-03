<script>
    import Button from "sveltestrap/src/Button.svelte"
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    fcRoot(FusionCharts, Charts, FusionTheme);
    import {
        onMount
    } from "svelte";
    var registrosNuts= [];
    var registrosInterTourism = [];
    var lista = [];
    var listaI = [];

    var dataSource ={};

    
    async function getRegisters(){
       
        const res = await fetch("https://sos2021-02.herokuapp.com/api/v2/nuts-production-stats");
        const res2 = await fetch("https://sos2021-03.herokuapp.com/api/v2/international-tourisms");
        if (res.ok && res2.ok) {
            const json = await res.json();
            const jsoninter = await res2.json();
            registrosNuts = json;
            registrosInterTourism = jsoninter;
            let i =0;
            let j=0;
            while(i<registrosNuts.length){
                if(registrosNuts[i].year==2015){
                    lista.push({"name":registrosNuts[i].country,"value":registrosNuts[i].pistachio});
                }
                i++;
            }
            console.log(`We have received ${registrosAirPollution.length} stats.`);
            
            while(j<registrosInterTourism.length){
                if(registrosInterTourism[j].year==2015){
                    listaI.push({"name":registrosInterTourism[j].country,"value":registrosInterTourism[j].numberofarrivals});
                }
                j++;
            }
            console.log(`We have received ${registrosInterTourism.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        
        dataSource = {
            "chart": {
            "caption": "Yearly Energy Production",
            "numbersuffix": " TWh",
            "formatnumberscale": "0",
            "showvalues": "0",
            "drawcrossline": "1",
            "showsum": "1",
            "plottooltext": "$dataValue from $seriesName",
            "theme": "fusion"
        },
        "categories": [
            {
            "category": [
                {
                "label": "Canada"
                },
                {
                "label": "China"
                },
                {
                "label": "Russia"
                },
                {
                "label": "Australia"
                },
                {
                "label": "United States"
                },
                {
                "label": "France"
                }
            ]
            }
        ],
        "dataset": [
            {
            "seriesname": "Coal",
            "data": [
                {
                "value": "400"
                },
                {
                "value": "830"
                },
                {
                "value": "500"
                },
                {
                "value": "420"
                },
                {
                "value": "790"
                },
                {
                "value": "380"
                }
            ]
            },
            {
            "seriesname": "Hydro",
            "data": [
                {
                "value": "350"
                },
                {
                "value": "620"
                },
                {
                "value": "410"
                },
                {
                "value": "370"
                },
                {
                "value": "720"
                },
                {
                "value": "310"
                }
            ]
            },
            {
            "seriesname": "Nuclear",
            "data": [
                {
                "value": "210"
                },
                {
                "value": "400"
                },
                {
                "value": "450"
                },
                {
                "value": "180"
                },
                {
                "value": "570"
                },
                {
                "value": "270"
                }
            ]
            },
            {
            "seriesname": "Gas",
            "data": [
                {
                "value": "180"
                },
                {
                "value": "330"
                },
                {
                "value": "230"
                },
                {
                "value": "160"
                },
                {
                "value": "440"
                },
                {
                "value": "350"
                }
            ]
            },
            {
            "seriesname": "Oil",
            "data": [
                {
                "value": "60"
                },
                {
                "value": "200"
                },
                {
                "value": "200"
                },
                {
                "value": "50"
                },
                {
                "value": "230"
                },
                {
                "value": "150"
                }
            ]
            }
        ]
        };
    
    
        loadGraph();
        
    }

    var chartConfigs={};

    async function loadGraph(){  
        chartConfigs = {
        type: 'stackedarea2d',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource
        };
        
    
    }
    onMount(getRegisters);
</script>

<main>
    <br>
    
    <Button outline color="dark" onclick="window.location.href='#/international-tourisms'">Volver</Button>
    <br>
    <br> 
    <h2>
      Integración de mi API con la de frutos secos del grupo 02
    </h2>
    <br>
    <br>
    <br>
    <SvelteFC {...chartConfigs} />
    
</main>
<style>

 </style>