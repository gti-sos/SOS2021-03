<script>
    import {
        onMount
	} from "svelte";
		
    import Table from "sveltestrap/src/Table.svelte";
    let inteltourisms=[];
    async function getInterTourisms() {
        console.log("Fetching tourisms...");
        const res = await fetch("/api/v1/international-tourisms/loadInitialData");
        if(res.ok){
            console.log("OK.");
            const json = await res.json();
            intertourisms = json;
            console.log(`We have received ${intertourisms.lenght} tourisms.`);
        }else{
            console.log("Error");
        }
    }
    onMount(getInterTourisms);
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
            {#each inteltourisms as datatourism}
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