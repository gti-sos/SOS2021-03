<script>
    import Button from "sveltestrap/src/Button.svelte";
    import {
        onMount
    } from "svelte";
    var BASE_CONTACT_API_PATH= "/api/v2";
    const paises = new Set();
    
    let Valor = [];
    let data = [];
    let data2=[];

    let numberofarrivals=[];
    let numberofdepartures=[];
    let expendituresbillion=[];
    
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms");
        const res2 = await fetch("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/27710?tip=AM/Data");
        if(res.ok ){
            console.log("Ok.");
            const json = await res.json();
            const json2 = await res2.json();
            data = json;
            data2= json2;
            console.log(`We have received ${data.length} data points.`);
            console.log(data2);
            let i=0;
            let e=0;
            while(e<data.length){    
                if(data[e].year==2011){
                    numberofarrivals.push({name: data[e].country, y:data[e].numberofarrivals});
                    numberofdepartures.push({name: data[e].country, y:data[e].numberofdepartures});
                    expendituresbillion.push({name: data[e].country, y:data[e].expendituresbillion});
                }
                e++;
            }
            console.log(numberofarrivals);
            console.log(expendituresbillion);
            console.log(numberofdepartures);
            while(i<1){
    
                Valor.push({name: data2[i].Nombre, y:data2[i].Data[0].Valor/1000});
            
                i++;
            
            }             
            console.log(Valor);
           
                
            //console.log(dict);
        }else{
            console.log("Error!");
        }
        loadGraph();
        
    }   
    onMount(getData);
    async function loadGraph(){  
    
        var chart = JSC.Chart('chartDiv', {
        debug: true,
        type: 'variwide', 
        title_label_text: 'Integración con datos de INE',
        yAxis: {  
            label_text: 'Valor'
        }, 
        xAxis_label_text: 'Nombre y Paises',
        series: [
        {
            name: 'Turismo',
            points: numberofarrivals, numberofdepartures, expendituresbillion
        },
        {
            name: 'INE Educación',
            points: Valor
        }
        ]
        });
    }
</script>
<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js"></script>
</svelte:head>
<main>
    <br>
        <Button outline color="secondary" onclick="window.location.href='#/integrations'">Volver</Button>
        <div id="chartDiv" style="max-width: 740px;height: 400px;margin: 0px auto"></div>
</main>