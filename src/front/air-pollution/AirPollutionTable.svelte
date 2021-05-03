<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
import R from "../App.svelte";
    

 
    let air_pollution = [];
    let newRegister= {
		"country": "", 
        "year": 0, 
        "deaths_ambient_particulate_matter_pollution": 0, 
        "deaths_household_air_pollution_from_solid_fuels": 0,
        "deaths_air_pollution": 0
	}

    const BASE_CONTACT_API_PATH = "/api/v1";

    
    async function getRegisters(){
        console.log("Fetching registers...");
		const res = await fetch("/api/v1/air-pollution");
		
		if(res.ok){
			console.log("All OK");
			const json = await res.json();
			air_pollution= json ;
			console.log(`We have ${air_pollution.length} registers.`);
			console.log(JSON.stringify(air_pollution));
		}else{
			console.log("Error!");
		}
    }   

    async function loadInitialData(){
		console.log("Fetching registers...");
		const res = await fetch("/api/v1/air-pollution/loadInitialData").then( (res)=> {
                        getRegisters();
						})
		
	}

    async function insertRegister(){
        console.log("Inserting register "+ JSON.stringify(newRegister));

        const res = await fetch(BASE_CONTACT_API_PATH+"/air-pollution",
                            {
                                method: "POST",
                                body: JSON.stringify(newRegister),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getRegisters();
                           })
    }
    
    async function deleteRegister(country, year){
        console.log("Deleting register with country "+ country + " and year "+ year );

        const res = await fetch(BASE_CONTACT_API_PATH+"/air-pollution/"+country+"/"+year,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getRegisters();
                           })
    }

    async function deleteAll(){
		
		const res = await fetch(BASE_CONTACT_API_PATH+"/air-pollution",
						{
							method: "DELETE"
							
						}).then( (res)=> {
						getRegisters();
						
						})
		
	}
	
    onMount(getRegisters);
</script>

<main>
    <h2>
        Tabla de estadisticas:
    </h2>
    <Table bordered>
        <thead>
            <tr>
                <td><Button on:click={loadInitialData}>Cargar registros</Button></td>
                <td><Button on:click={deleteAll}>Borrar todos los registros</Button></td>
                
            </tr>
            <tr>
                <td>Pais</td>
                <td>Año</td>
                <td>Muertes por contaminación del aire de particulas</td>
                <td>Muertes por contaminación del aire por combustibles sólidos</td>
                <td>Muertes por contaminación del aire</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newRegister.country}"></td>
					<td><input type=number bind:value="{newRegister.year}"></td>
					<td><input type=number bind:value="{newRegister.deaths_ambient_particulate_matter_pollution}"></td>
					<td><input type=number bind:value="{newRegister.deaths_household_air_pollution_from_solid_fuels}"></td>
					<td><input type=number bind:value="{newRegister.deaths_air_pollution}"></td>
					<td><Button on:click={insertRegister}>Añadir</Button>
                </td>
            </tr>
            {#each air_pollution as r}
                <tr>
                <td>{r.country}</td>
                <td>{r.year}</td>
                <td>{r.deaths_ambient_particulate_matter_pollution}</td>
                <td>{r.deaths_household_air_pollution_from_solid_fuels}</td>
                <td>{r.deaths_air_pollution}</td>
                <td><Button on:click={deleteRegister(r.country, r.year)}>Borrar</Button>
                <td><a href="#/air-pollution/{r.country}/{r.year}" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Editar</a>
                    
                    
                </tr>

            {/each}
            
        </tbody>
    </Table>
</main>
