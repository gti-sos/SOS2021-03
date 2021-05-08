<script> 
	

	import Qof from './quality_of_life/quality_of_life.svelte';


	
	import {
    	Button,
    	Modal,
    	ModalBody,
   		ModalFooter,
   		ModalHeader
  	} from 'sveltestrap';

  let opena = false;
 
  
  const togglea = () =>{
  	
  	(opena = !opena);
  } 
</script>

<head>
<title>Readme fichero</title>
</head>

<main>
	<h1>SOS2021-03</h1>
	<h3>Github</h3>
	<div> - [Joan Villalonga Alvaro]<a href="https://github.com/joavilalv">(https://github.com/joavilalv)</a></div>
	<div> - [Paula Garrido Lerma]<a href="https://github.com/Paula0008">(https://github.com/Paula0008)</a></div>
	<div> - [Ayman Alaoui Mhammedi]<a href="https://github.com/AymanAlaouiMhammedi">https://github.com/AymanAlaouiMhammedi)</a></div>
	<h3>Proyecto</h3>
	<div> - *Project description*: Nuestras fuentes de información están orientadas a analizar la relación que existe entre como la calidad de vida puede influenciar al turismo y este ver si al viajar más, es decir, se usan más transportes, hace que aumente la contaminación del aire y las muertes que esto conlleva.</div>
	<div> - *Repository*: [gti-sos/SOS2021-03] <a href="https://github.com/gti-sos/SOS2021-03.git">(https://github.com/gti-sos/SOS2021-03.git)</a></div>
	<div> - *URL*: [http://sos2021-03.herokuapp.com] <a href="http://sos2021-03.herokuapp.com">(http://sos2021-03.herokuapp.com)</a></div>
	<div> -  *APIs*:</div>
	<div><a href="https://documenter.getpostman.com/view/14974548/TzJoE1G7">- POSTMAN: https://documenter.getpostman.com/view/14974548/TzJoE1G7</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/air-pollution">[https://sos2021-03.herokuapp.com/api/v1/air-pollution](https://sos2021-03.herokuapp.com/api/v1/air-pollution) (developed by [Joan Villalonga Alvaro](https://github.com/joavilalv))</a></div>
	<div><a href="https://documenter.getpostman.com/view/9683446/TzJoE1Zk">- POSTMAN: https://documenter.getpostman.com/view/9683446/TzJoE1Zk</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/international-tourisms">[https://sos2021-03.herokuapp.com/api/v1/international-tourisms](https://sos2021-03.herokuapp.com/api/v1/international-tourisms) (developed by [Paula Garrido Lerma](https://github.com/Paula0008))</a></div>
	<div><a href="https://documenter.getpostman.com/view/14967959/TzJydbsW">- POSTMAN: https://documenter.getpostman.com/view/14967959/TzJydbsW</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">[https://sos2021-03.herokuapp.com/api/v1/quality-of-life] (developed by [Ayman Alaoui Mhammedi](https://github.com/AymanAlaouiMhammedi))</a></div>
	
	<ul>

		<li><a href="https://sos2021-03.herokuapp.com/api/v1/air-pollution">Air-pollutions deaths</a> (developed by Joan Villalonga)</li>
		<li><a href="https://sos2021-03.herokuapp.com/api/v1/international-tourisms">Inter Tourisms</a> (developed by Paula Garrido Lerma)</li>
		<li><a href="https://sos2021-03.herokuapp.com/api/v1/quality-of-life">Quality of life indexes</a> (developed by Ayman Alaoui Mhammedi)</li>

	</ul>
	
	<ul>
		<li>Desarrollado por Joan Villalonga Alvaro.
			<br>
			<br>
			<a href="https://github.com/joavilalv" class="btn btn-outline-info" role="button" aria-pressed="true">Cuenta de Github</a>
			<a href="https://ourworldindata.org/grapher/death-rates-from-air-pollution" class="btn btn-outline-info" role="button" aria-pressed="true">Muertes por contaminación del aire(Fuente)</a>
			<br>
			<br>
			
			Estadísticas de muertes por contaminación del aire: 
			<br>
			<br>
			<a href="#/air-pollution" class="btn btn-outline-info" role="button" aria-pressed="true">Abrir estadisticas(front-end)</a>
			<br>
			<a href="https://sos2021-03.herokuapp.com/api/v1/air-pollution" class="btn btn-outline-secondary" role="button" aria-pressed="true">API Muertes por contaminación del aire</a>
			<br>
			<a href="https://documenter.getpostman.com/view/14974548/TzJoE1G7" class="btn btn-outline-warning" role="button" aria-pressed="true">TEST de POSTMAN</a>

		</li>

		<li>Desarrollado por Paula Garrido Lerma.
			<br>
			<br>
			<a href="https://github.com/Paula0008" class="btn btn-outline-info" role="button" aria-pressed="true">Cuenta de Github</a>
			<a href="https://data.worldbank.org/indicator/ST.INT.RCPT.XP.ZS?end=2018&most_recent_year_desc=false&start=2018&view=map&year=1995" class="btn btn-outline-info" role="button" aria-pressed="true">Fuente utilizada</a>
			<br>
			<br>
			
			Turismo internacional: 
			<br>
			<br>
			<a href="/international-tourisms" class="btn btn-outline-info" role="button" aria-pressed="true">Ver estadísticas(front-end)</a>
			<br>
			<a href="https://sos2021-03.herokuapp.com/api/v1/international-tourisms" class="btn btn-outline-info" role="button" aria-pressed="true">API turismo internacional</a>
			<br>
			<a href="https://documenter.getpostman.com/view/9683446/TzJoE1Zk" class="btn btn-outline-info" role="button" aria-pressed="true">Test de POSTMAN</a>

		</li>

	   <li>Indices de calidad de vida: 
			<p>
				<Button outline color="warning" on:click={togglea}>Mostrar</Button>
				<Modal isOpen={opena} {togglea} size= 'lg'>
				<ModalHeader {togglea}>Calidad de vida:</ModalHeader>
				<ModalBody>
					<Qof/>
				</ModalBody>
				<ModalFooter>
				<Button color="secondary" on:click={togglea}>Cerrar</Button>
				</ModalFooter>
				</Modal>
			</p>
		   
		</li>
	</ul>



	
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #5ea8d3;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	
	ul {
		width: fit-content;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>