<script>
    import Button from "sveltestrap/src/Button.svelte"
    var registrosAirPollution = [];
    var registrosSanity = [];
    var paises = new Set();
    

    async function getRegisters(){
        console.log("Fetching air death's pollution data...");
        const res = await fetch("https://sos2021-03.herokuapp.com/api/v1/air-pollution");
        if (res.ok) {
            const json = await res.json();
            registrosAirPollution = json;
            console.log(`We have received ${registrosAirPollution.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
        console.log("Fetching sanity data...");
        const res1 = await fetch("https://sanity-integration.herokuapp.com/sanity-stats");
        if (res1.ok) {
            const json2 = await res1.json();
            registrosSanity = json2;
            console.log(`We have received ${registrosSanity.length} stats.`);
        } else {
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad(){
        await getRegisters();
        var registros = {};
        var registrosAP = [];
        var registrosSNT = [];
        
        registrosSanity.forEach((d)=>{
            var a = [d.year, d.country.toUpperCase(), d.hospital_bed/1000000];
            registrosSNT.push(a);
            paises.add(d.country.toUpperCase());
        });
        var paises2= Array.from(paises);
        console.log("Paises" + paises2);
        registrosAirPollution.forEach((c)=>{
            console.log(paises2.includes(c.country.toUpperCase()));
            if(paises2.includes(c.country.toUpperCase())){
                var r = [c.year, c.country.toUpperCase(), c.deaths_air_pollution];
                registrosAP.push(r);
            }
            
        });
        
        console.log(registrosSNT);
        console.log(registrosAP);
        for(let r of registrosAP){
            var k = [r[0], r[1]];
            if(registros[k]){
                registros[k].push([r[2]]);
            }else{
                registros[k]=[r[2]];
            }
        }
        for(let r of registrosSNT){
            var k = [r[0], r[1]];
            if(registros[k]){
                registros[k].push([r[2]]);
            }else{
                registros[k]=[r[2]];
            }
        }
        console.log(registros);

    }
</script>
<main>
    <h2>
        Tabla de estadisticas:
    </h2>
    <br>
    <Button on:click={onLoad}>Cargar registros</Button>
    <br>
    <br>
    
<!--
    <Table bordered>
        <thead>
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
		  <PaginationLink next href="#/air-pollution" on:click="{() => incrementOffset(1)}"/>
		</PaginationItem>
	</Pagination>-->
</main>