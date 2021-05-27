<script>
    import MyChart from "./inter.js";
  
    import {
        onMount
    } from "svelte";
 	
	var BASE_CONTACT_API_PATH= "/api/v1";
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
		loadGraph();
        console.log("Ya se deberia de haber cargado la grafica");
		
    }   
    
  
    
  }
</script>

<main>

    <br>
    <br>
  
</main>
    