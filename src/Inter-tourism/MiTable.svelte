<script>
    import {
        onMount
	} from "svelte";
		
    import Table from "sveltestrap/src/Table.svelte";
    let intertourisms=[];
    async function getIntertourisms() {
        console.log("Loading tourisms...");
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
			intertourisms = json;
			console.log(`We have ${intertourisms.length} intertourisms.`)
		}else{
			console.log("Error");
		}
  	}
    onMount(getRegisters);
</script>

<main>
    <Table bordered>
        <thread> 
            <tr>
                <td>País</td>
                <td>Año</td>
                <td>Número de llegadas</td>
                <td>Número de salidas</td>
                <td>Gasto en billones</td>
            </tr>
        </thread>
        <tbody>
            {#each intertourisms as datatourism}
                <tr>
                    <td>{datatourism.country}</td>
                    <td>{datatourism.year}</td>
                    <td>{datatourism.numberofarribals}</td>
                    <td>{datatourism.numberofdepartures}</td>
                    <td>{datatourism.expendituresbillion}</td>
                </tr>
            {/each}
        </tbody>
    </Table>

</main>