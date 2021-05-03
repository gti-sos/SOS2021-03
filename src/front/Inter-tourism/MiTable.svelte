<script>
	import {
		onMount
	} from "svelte";
	
	import Table from "sveltestrap/src/Table.svelte";
	let inter_tourism = [];
	
	
	async function RegisterData() {
    	console.log("Loading data...");
   		const res = await fetch("/api/v1/international-tourisms/loadInitialData");
		
        if(res.ok){
			console.log("Ok.");
			getRegisters();
		}else{
			console.log("Error");
		}
  	}
	
	async function getRegisters() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/international-tourisms/");
		
        if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			inter_tourism = json;
			console.log(`We have ${inter_tourism.length} inter tourism.`)
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
				<td>Número de llegadas</td>
				<td>Número de salidas</td>
				<td>Gastos en billones</td>
			</tr>
		</thead>
		<tbody>
			{#each inter_tourism as r}
				<tr>
				<td>{r.country}</td>
				<td>{r.year}</td>
				<td>{r.numberofarribals}</td>
				<td>{r.numberofdepartures}</td>
				<td>{r.expendituresbillion}</td>
				
				
				</tr>
			{/each}
			
		</tbody>
	</Table>
</main>
