<script>
	import {
		onMount
	} from "svelte";
	
	import Table from "sveltestrap/src/Table.svelte";
	let quality_of_life = [];
	
	
	async function RegisterData() {
    	console.log("Loading data...");
   		const res = await fetch("/api/v1/quality-of-life/loadInitialData");
		
        if(res.ok){
			console.log("Ok.");
			getRegisters();
		}else{
			console.log("Error");
		}
  	}
	
	async function getRegisters() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/quality-of-life/");
		
        if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			quality_of_life = json;
			console.log(`We have ${quality_of_life.length} quality_of_life.`)
		}else{
			console.log("Error");
		}
  	}
	
	onMount(getRegisters);
	
</script>

<main>
	<Table bordered>
		<thead>
			<tr>
				<td>Pais</td>
				<td>Año</td>
				<td>Calidad de vida</td>
				<td>Poder adquisitivo</td>
				<td>Indice de servicio de sanidad</td>
			</tr>
		</thead>
		<tbody>
			{#each quality_of_life as r}
				<tr>
				<td>{r.country}</td>
				<td>{r.year}</td>
				<td>{r.quality_of_life}</td>
				<td>{r.purchasing_power}</td>
				<td>{r.health_care}</td>
				
				
				</tr>
			{/each}
			
		</tbody>
	</Table>
</main>

