<script>
	import {
		onMount
	} from "svelte";
	
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
    
	let inter_tourism = [];
	let newRegister= {
		"country": "", 
        "year": 0, 
        "numberofarribals": 0, 
        "numberofdepartures": 0,
        "expendituresbillion": 0
	}
    let long = 10;
    let searchcountry = "";
    let searchyear = 0;
    let offset = 0;
    let moreRegisters = true;
    let pagActual = 1;
    const BASE_CONTACT_API_PATH = "/api/v1";

	async function getRegisters() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/international-tourisms?offset=" + long*offset+"&limit="+long);
		const res2 = await fetch("/api/v1/international-tourisms?offset=" + long*(offset+1)+"&limit="+long);
        
        if(res.ok){
			console.log("Ok.");
			const json = await res.json();
			const json2 = await res2.json();
			inter_tourism = json;
			if(json2.length==0){
                moreRegisters=false;
            }else{
                moreRegisters = true;
            }
			console.log(`We have ${inter_tourism.length} registers.`);
			console.log(JSON.stringify(inter_tourism));
		}else{
			console.log("Error!");
		}
  	}
	
	function incrementOffset(num){
		offset+=num;
		pagActual+=num;
		getRegisters();
    }

	async function loadInitialData() {
		const res = await fetch("/api/v1/international-tourisms/loadInitialData", {
      		method: "GET"
        }).then(function (res) {
			if(res.status == 200){
            	window.alert("Insetando elementos en la tabla");
        	}else if(res.status == 409){
            	window.alert("No es posible realizar la accion ya que hay elementos en ella,pulse el boton de eliminar para poder ejecutar esta accion");
      	  }
			getRegisters();
			});
		
	}
	     
	async function insertRegister(){
        console.log("Inserting register "+ JSON.stringify(newRegister));

        const res = await fetch(BASE_CONTACT_API_PATH+"/international-tourisms",
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

        const res = await fetch(BASE_CONTACT_API_PATH+"/international-tourisms/"+country+"/"+year,
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
		
		const res = await fetch(BASE_CONTACT_API_PATH+"/international-tourisms",
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

	async function buscaRegistro(country, year) {
		console.log("Realizando búsqueda del país: " + country + " y del año: " + year);
        
        year=parseInt(year);
        
        var url = "/api/v1/international-tourisms";
        
		if (country != "" && year != "") {
            url = url + "?country=" + country + "&year=" + year;
            console.log(url);
        } 
        else if (country != "" && year == "") {
            url = url + "?country=" + country;
            console.log(url);
        } 
        else if (country == "" && year != "") {
            url = url + "?year=" + year;
            console.log(url);
        }
        
        const res = await fetch(url);
        
		if (res.ok) {
			console.log("OK");
			const json = await res.json();
            console.log(json);
			interTourisms=json;	
            console.log("international-tourisms now is that:");
            console.log(interTourisms);	
            console.log(interTourisms.length);
			console.log("Encontrados " + interTourisms.length + " registros.");
			/*
            if(interTourisms.length > 0 || interTourisms[0]!=[]){
                window.alert("Se han encontrado: "+ interTourisms.length + " resultados.");
                
            }
            else{
                window.alert("No se han encontrado registros para esta busqueda");
            }*/
			if(country =="" && year==""){
			window.alert("Introduce datos");
			}else if(interTourisms.length > 0){
				window.alert("Datos encontrados");
			}else{
				window.alert("No hay resultados");
			}
        } 
        else {
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
	{#await inter_tourism}
        Loading datas...
	{:then inter_tourism}
		<Button on:click={loadInitialData}>Cargar los datos</Button>
		<Button on:click={deleteAll}>Borrar todos los datos</Button>
		<br>
		
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
				<tr>
					<td><input bind:value="{newRegister.country}"></td>
						<td><input type=number bind:value={newRegister.year}></td>
						<td><input type=number bind:value={newRegister.numberofarribals}></td>
						<td><input type=number bind:value={newRegister.numberofdepartures}></td>
						<td><input type=number bind:value={newRegister.expendituresbillion}></td>
						<td><Button on:click={insertRegister}>Añadir</Button>
					</td>
				</tr>
				{#each inter_tourism as r}
					<tr>
					<td>{r.country}</td>
					<td>{r.year}</td>
					<td>{r.numberofarribals}</td>
					<td>{r.numberofdepartures}</td>
					<td>{r.expendituresbillion}</td>
					<td><Button on:click={deleteRegister(r.country, r.year)}>Borrar</Button>
						<br>
					<a href="#/international-tourisms/{r.country}/{r.year}" class="btn btn-info active" role="button" aria-pressed="true">Editar</a>
					
					
					</tr>
				{/each}
				
			</tbody>
		</Table>
	{/await}
	<Pagination style="float:center;" ariaLabel="Cambiar de página">
		<PaginationItem class="{pagActual === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/international-tourisms" on:click="{() => incrementOffset(-1)}" />
		</PaginationItem>
		{#if pagActual != 1}
		<PaginationItem>
			<PaginationLink href="#/international-tourisms" on:click="{() => incrementOffset(-1)}" >{pagActual - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/international-tourisms" >{pagActual}</PaginationLink>
		</PaginationItem>
		{#if moreRegisters}
		<PaginationItem >
			<PaginationLink href="#/international-tourisms" on:click="{() => incrementOffset(1)}">{pagActual + 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem class="{moreRegisters ? '' : 'disabled'}">
		  <PaginationLink next href="#/international-tourisms" on:click="{() => incrementOffset(1)}"/>
		</PaginationItem>
	</Pagination>
	<Table bordered>
        <tbody>
            <tr>
				<td >Selecciona el País:</td>
				<td><input type ="text" name="selectCountry" id="selectCountry" bind:value="{searchcountry}"></td>
				<td >Seleccione el año: </td>
				<td><input type ="number" name="selectYear" id="selectYear" bind:value="{searchyear}"></td>
                <td>
                    <div style="text-align:center;padding-bottom: 3%;margin-top: 6%;">
                        <Button outline  color="primary" on:click="{buscaRegistro(searchcountry,searchyear)}" href="#/international-tourisms/{searchcountry}/{searchyear}">Buscar</Button>
                    </div>
                </td>
            </tr>
        </tbody>
    </Table>
</main>
