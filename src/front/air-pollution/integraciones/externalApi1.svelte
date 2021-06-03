<script>
var diccAlbacete = {};
var diccAlmeria = {};
var datos = [];
var datos1 = [];
var country = [];
var years = [];
var years2 = [];
var registrosGrafico = [];
var registrosGrafico2 = [];

import {
        onMount
    } from "svelte";

async function getRegisters() {
    console.log("Fetching external 1...");
    
    const res = await fetch("https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/36742?tip=AM");
    if(res.ok){
        console.log("Ok.");
        const json = await res.json();
        country = json;
        let nombre = country[1].MetaData[1].Nombre;
        datos=country[1].Data;
        let nombre1 = country[3].MetaData[1].Nombre;
        datos1=country[3].Data;
        console.log("datos1");
        console.log(datos1);
        let i=0;
        while(i<datos.length/3){
            if(parseFloat(datos[i].Valor-32)>0){
                diccAlbacete[parseInt(datos[i].Anyo)]=parseFloat(datos[i].Valor-32);
            }
            if((parseFloat(datos1[i].Valor-30)>0)){
                diccAlmeria[parseInt(datos1[i].Anyo)]=parseFloat(datos1[i].Valor-30);
            }
            i++;
        }
        console.log(nombre);
        console.log(nombre1);
    }else{
        console.log("Error!");
    }

    Object.entries(diccAlbacete).forEach(([key, value]) => {
        years.push(key);
        registrosGrafico.push({name: key , data: value})
        
    });

    Object.entries(diccAlmeria).forEach(([key, value]) => {
        years2.push(key);
        registrosGrafico2.push({name: key , data: value})
        
    });
    
    console.log("Albacete:");
    console.log(diccAlbacete);
    console.log("Almeria:");
    console.log(diccAlmeria);
    LoadGraph();
    LoadGraph2();


}
onMount(getRegisters);
async function LoadGraph(){
    var data = {
        labels: years,
        series: registrosGrafico
        };

        var options = {
        labelInterpolationFnc: function(value) {
            return value[0]
        }
        };

        var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
            return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
        ];

        new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
}

async function LoadGraph2(){
    var data2 = {
        labels: years2,
        series: registrosGrafico2
        };

        var options2 = {
        labelInterpolationFnc: function(value) {
            return value[0]
        }
        };

        var responsiveOptions2 = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
            return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
        ];

        new Chartist.Pie('.ct-chart2', data2, options2, responsiveOptions2);
}
    
</script>
<main>
    <h2>
        Integración con API externa de Edad Media a la maternidad por año
    </h2>
    <br>
    <h6>Source: <a href="https://servicios.ine.es/wstempus/js/es/DATOS_TABLA/36742?tip=AM">API de la que se ha obtenido la información</a></h6>
    
    
    <br>
    
    <h5 class = "centro">Diagrama de Edada Media a la maternidad por año en Albacete</h5>
    <br>
    <div class="ct-chart ct-perfect-fourth c"></div>
    <br>
    <br>
    <h5 class = "centro">Diagrama de Edada Media a la maternidad por año en Almería</h5>
    <br>
    <div class="ct-chart2 ct-perfect-fourth c"></div>
    <br>
    <p class="centro">
            
        Estadísticas de Edad Media a la maternidad en algunas ciudades por años<br>
    
        
    </p>
    <br>
    <br>
    <br>

</main>
<style>
    .c { 
        width: 75%; 
        height: 512px;
        margin-left: auto;
        margin-right: auto;
    }
    .centro {
        text-align: center;
    }
</style>