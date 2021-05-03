<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let register = {};
    let updatedCountry = "XXXX";
    let updatedYear = 1234;
    let updateddeaths_ambient_particulate_matter_pollution = 12345;
    let updateddeaths_household_air_pollution_from_solid_fuels = 12345;
    let updateddeaths_air_pollution = 12345;
    let errorMsg = "";
/*
updated.deaths_ambient_particulate_matter_pollution
updated.deaths_household_air_pollution_from_solid_fuels
updated.deaths_air_pollution
*/

    onMount(getRegisters);

    async function getRegisters() {

        console.log("Fetching registers...");
        const res = await fetch("/api/v1/air-pollution/" + params.country+ "/"+params.year);

        if (res.ok) {
            console.log("All OK");
            const json = await res.json();
            register = json;
            updatedCountry = register.country;
            updatedYear = parseInt(register.year);
            updateddeaths_ambient_particulate_matter_pollution = parseFloat(register.deaths_ambient_particulate_matter_pollution);
            updateddeaths_household_air_pollution_from_solid_fuels = parseFloat(register.deaths_household_air_pollution_from_solid_fuels);
            updateddeaths_air_pollution =parseFloat(register.deaths_air_pollution);
            console.log("Received register.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateRegister() {

        console.log("Updating register..." + JSON.stringify(params.country)+ ", " + JSON.stringify(params.year));

        const res = await fetch("/api/v1/air-pollution/" + params.country+ "/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: params.year, 
                deaths_ambient_particulate_matter_pollution: updateddeaths_ambient_particulate_matter_pollution,
                deaths_household_air_pollution_from_solid_fuels: updateddeaths_household_air_pollution_from_solid_fuels,
                deaths_air_pollution: updateddeaths_air_pollution
                
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getRegisters();
        });



    }
</script>
<main>
    <h3>Editar registro con pais <strong>{params.country}</strong> y año <strong>{params.year}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Muertes por contaminación del aire de particulas</th>
                    <th>Muertes por contaminación del aire por combustibles sólidos</th>
                    <th>Muertes por contaminación del aire</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>


                    <td><input bind:value="{updateddeaths_ambient_particulate_matter_pollution}"></td>
                    <td><input bind:value="{updateddeaths_household_air_pollution_from_solid_fuels}"></td>
                    <td><input bind:value="{updateddeaths_air_pollution}"></td>
                    <td> <Button outline  color="primary" on:click={updateRegister}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>