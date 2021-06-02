<script>
   
    import {
        onMount
    } from "svelte";
	



	var BASE_CONTACT_API_PATH= "/api/v2";
	const paises = new Set();
	let years = new Set();
	var dictInter ={};
	let inter = [];
	
	var dictAnyoPais ={};

    let data = [];


    async function getData(){
        console.log("Fetching data...");
        const res = await fetch(BASE_CONTACT_API_PATH + "/international-tourisms");
        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
			let i=0;
			data.reverse();
			while(i<data.length){
				years.add(data[i].year);
				if(dictInter[data[i].country]){
					dictInter[data[i].country].push(data[i].inter);
				}
				else{
					dictInter[data[i].country]=[parseInt(data[i].inter)];
				}
				
				if(dictAnyoPais[data[i].country]){
					dictAnyoPais[data[i].country].push(data[i].year);
				}
				else{
					dictAnyoPais[data[i].country]=[parseInt(data[i].year)];
				}
				i++;
			}
			console.log(dictInter);
			
			
        }else{
            console.log("Error!");
        }
		let paises= Object.keys(dictInter);
		for(let p=0; p<paises.length; p++){
			if(dictAnyoPais[paises[p]]){
				let anyos=dictAnyoPais[paises[p]].sort();
				let a=0;
					while(a<Array.from(years).length){
						let ord =Array.from(years).sort();
						if(!anyos.includes(ord[a])){
							dictInter[paises[p]].splice(a, 0, null);
						}
						a++
					}
			}
		}
		Object.entries(dictInter).forEach(([key, value]) => {
			
			inter.push({name: key , data: value})
		});
		
	console.log("Antes de la gráfica");
		
	loadGraph();
	
	console.log("Ya se deberia de haber cargado la grafica");

	

	}
	onMount(getData);
	import * as d3 from "d3";

	async function loadGraph(){
		var data = [2, 4, 8, 10];

		d3.json("http://localhost:1607/api/v2/international-tourisms", function(data) {
    		console.log(data);
		});
		var svg = d3.select("svg"),
			width = svg.attr("width"),
			height = svg.attr("height"),
			radius = Math.min(width, height) / 2,
			g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

		// Generate the pie
		var pie = d3.pie();

		// Generate the arcs
		var arc = d3.arc()
					.innerRadius(0)
					.outerRadius(radius);

		//Generate groups
		var arcs = g.selectAll("arc")
					.data(pie(data))
					.enter()
					.append("g")
					.attr("class", "arc")

		//Draw arc paths
		arcs.append("path")
			.attr("fill", function(d, i) {
				return color(i);
			})
			.attr("d", arc);

	}

</script>

<svelte:head>
	<script  src="https://d3js.org/d3-selection.v1.min.js" > </script>
	<script src="https://d3js.org/d3.v6.min.js"></script>
	<script  src="https://d3js.org/d3.v5.js"> </script>
	<script  src="https://d3js.org/d3.v5.min.js"></script>
	<script src="https://d3js.org/d3.v4.min.js"></script>
	
</svelte:head>



<main>

<br>
<br>

<div>
	<h5>
		Gráfica 
		
	</h5>
		<svg width="600" height="500"></svg>
	<br>
	
</div>
		

  
<br>
<br>    



</main>

<style>
	.bar {
		fill: steelblue;
	}
</style>