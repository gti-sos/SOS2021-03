<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

    

 
    let air_pollution = [];
    let newRegister= {
		"country": "", 
        "year": 0, 
        "deaths_ambient_particulate_matter_pollution": 0, 
        "deaths_household_air_pollution_from_solid_fuels": 0,
        "deaths_air_pollution": 0
	}
    let long = 10;
    let offset = 0;
    let moreRegisters = true;
    let pagActual = 1;
    const BASE_CONTACT_API_PATH = "/api/v1";

    
    async function getRegisters(){
        console.log("Fetching registers...");
		const res = await fetch("/api/v1/air-pollution?offset=" + long*offset+"&limit="+long);
        const res2 = await fetch("/api/v1/air-pollution?offset=" + long*(offset+1)+"&limit="+long);
        
		
		if(res.ok){
			console.log("All OK");
			const json = await res.json();
            const json2 = await res2.json();
			air_pollution= json ;
            if(json2.length==0){
                moreRegisters=false;
            }else{
                moreRegisters = true;
            }
			console.log(`We have ${air_pollution.length} registers.`);
			console.log(JSON.stringify(air_pollution));
		}else{
			console.log("Error!");
		}
    } 
    
    function incrementOffset(num){
        offset+=num;
        pagActual+=num;
        getRegisters();
    }

    async function loadInitialData(){
		console.log("Fetching registers...");
		const res = await fetch("/api/v1/air-pollution/loadInitialData").then( (res)=> {
                        if(res.status==200){
                            window.alert("Datos insertados correctamente.")
                        }else if (status==409){
                            window.alert("Los datos ya están cargados, si quiere volver a cargarlos deberá eliminar primero los actuales.")
                        }
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
                            if(res.status == 201){
			                    window.alert("Nuevo registro creado correctamente. ");
		                    }else if(res.status == 409){
			                    window.alert("Dato ya existente. ");
		                    }else if(res.status == 400){
			                    window.alert("Datos no válidos(no puede quedarse vacío ningun campo. ");
		                    }
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
                            if(res.status == 200){
                                window.alert("Dato eliminado correctamente. ");
                            }else if(res.status == 404){
                                window.alert("No existe ningun registro para eliminar con pais: " + country + " y año "+ year);
                            }
                            getRegisters();
                           })
    }

    async function deleteAll(){
		
		const res = await fetch(BASE_CONTACT_API_PATH+"/air-pollution",
						{
							method: "DELETE"
							
						}).then( (res)=> {
                            if(res.status == 200){
                                window.alert("Registros eliminados correctamente. ");
                            }else if(res.status == 405){
                                window.alert("No hay registros para eliminar. ");
                            }
						    getRegisters();
						})
		
	}

    async function buscaRegistro(country, year){
        var url = BASE_CONTACT_API_PATH+"/air-pollution";
        if (country != "" && year != "") {
                url = url + "?year=" + year + "&country=" + country;
        }else if (country != "" && year == "") {
                url = url + "?country=" + country;
        }else if (country == "" && year != "") {
                url = url + "?year=" + year;
        }
        const res = await fetch(url);

        if (res.ok) {
            const json = await res.json();
            countries = json;
            if(year =="" && country==""){
                window.alert("Introduzca los datos correspondientes al registro que desea buscar: ");
            }else if(countries.length > 0  ){
                
                window.alert("Se han encontrado: "+ countries.length + " resultados.");
            }else{
            
                window.alert("No se han encontrado registros para esta busqueda");
            }

        }else{
            console.log("ERROR");
        }
    }
	
    onMount(getRegisters);
</script>

<main>
    <h2>
        Tabla de estadisticas:
    </h2>
    <br>
    <Button on:click={loadInitialData}>Cargar registros</Button>
    <Button on:click={deleteAll}>Borrar todos los registros</Button>
    <br>
    <Table bordered>
        <thead>
            <tr>
                <td><input bind:value="{newRegister.country}"></td>
					<td><input type=number bind:value={newRegister.year}></td>>
					<td><Button on:click={buscaRegistro(newRegister.country, newRegister.year)}>Buscar</Button>
                </td>
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
					<td><input type=number bind:value={newRegister.year}></td>
					<td><input type=number bind:value={newRegister.deaths_ambient_particulate_matter_pollution}></td>
					<td><input type=number bind:value={newRegister.deaths_household_air_pollution_from_solid_fuels}></td>
					<td><input type=number bind:value={newRegister.deaths_air_pollution}></td>
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
                    <br>
                <a href="#/air-pollution/{r.country}/{r.year}" class="btn btn-info active" role="button" aria-pressed="true">Editar</a>
                    
                    
                </tr>

            {/each}
                

        </tbody>
    </Table>
    <Pagination style="float:center;" ariaLabel="Cambiar de página">
		<PaginationItem class="{pagActual === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/air-pollution" on:click="{() => incrementOffset(-1)}" />
		</PaginationItem>
		{#if pagActual != 1}
		<PaginationItem>
			<PaginationLink href="#/air-pollution" on:click="{() => incrementOffset(-1)}" >{pagActual - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/air-pollution" >{pagActual}</PaginationLink>
		</PaginationItem>
		{#if moreRegisters}
		<PaginationItem >
			<PaginationLink href="#/air-pollution" on:click="{() => incrementOffset(1)}">{pagActual + 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem class="{moreRegisters ? '' : 'disabled'}">
		  <PaginationLink next href="#/countries_for_equality_stats" on:click="{() => incrementOffset(1)}"/>
		</PaginationItem>
	</Pagination>
</main>
