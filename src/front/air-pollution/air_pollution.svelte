<script>
	import {
		onMount
	} from "svelte";
	
	import Table from "sveltestrap/src/Table.svelte";
	let air_pollution = [];
	
	
	async function RegisterData() {
    	console.log("Loading data...");
   		const res = await fetch("/api/v1/air-pollution/loadInitialData");
		
        if(res.ok){
			console.log("Ok.");
			getRegisters();
		}else{
			console.log("Error");
		}
  	}
	
	async function getRegisters() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/air-pollution/");
		
        if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			air_pollution = json;
			console.log(`We have ${air_pollution.length} air_pollution.`)
		}else{
			console.log("Error");
		}
  	}
	
	onMount(getRegisters);
	
</script>

	<head>
		<title>Contaminacion del aire</title>
	</head>
	<main>
		<h1>
			Estadisticas de muerte por contaminacion del aire:
		</h1>
		<Table bordered>
			<thead>
				<tr>
					<td>Pais</td>
					<td>Año</td>
					<td>Muertes por contaminación del aire de particulas</td>
					<td>Muertes por contaminación del aire por combustibles sólidos</td>
					<td>Muertes por contaminación del aire</td>
				</tr>
			</thead>
			<tbody>
				{#each air_pollution as r}
					<tr>
					<td>{r.country}</td>
					<td>{r.year}</td>
					<td>{r.deaths_ambient_particulate_matter_pollution}</td>
					<td>{r.deaths_household_air_pollution_from_solid_fuels}</td>
					<td>{r.deaths_air_pollution}</td>
					
					
					</tr>
				{/each}
				
			</tbody>
		</Table>
	</main>


