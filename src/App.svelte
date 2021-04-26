<script> 
	import AirPollution from './air-pollution/air_pollution.svelte';
	import InterTourism from './Inter-tourism/intertourism.svelte';
	import {
    	Button,
    	Modal,
    	ModalBody,
   		ModalFooter,
   		ModalHeader,
		Breadcrumb,
		BreadcrumbItem
  	} from 'sveltestrap';

  let open = false;
  let openob = false;
  const toggle = () =>{
  	
  	(open = !open);
  } 
  
  const toggleob = () =>{
  	
  	(openob = !openob);
  } 
</script>

<head>
<title>Readme fichero</title>
</head>

<main>
	<h1>## SOS2021-03</h1>

	<a href="https://github.com/joavilalv"> - [Joan Villalonga Alvaro](https://github.com/joavilalv)</a>
	<div> - [Paula Garrido Lerma](https://github.com/Paula0008)</div>
	<div> - [Ayman Alaoui Mhammedi](https://github.com/AymanAlaouiMhammedi)</div>
	<div> - *Project description*: Nuestras fuentes de información están orientadas a analizar la relación que existe entre como la calidad de vida puede influenciar al turismo y este ver si al viajar más, es decir, se usan más transportes, hace que aumente la contaminación del aire y las muertes que esto conlleva.</div>
	<div> - *Repository*: [gti-sos/SOS2021-03](https://github.com/gti-sos/SOS2021-03.git)</div>
	<div> - *URL*: [http://sos2021-03.herokuapp.com](http://sos2021-03.herokuapp.com)</div>
	<div> -  *APIs*:</div>
	<div><a href="https://documenter.getpostman.com/view/14974548/TzJoE1G7">- POSTMAN: https://documenter.getpostman.com/view/14974548/TzJoE1G7</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/air-pollution">[https://sos2021-03.herokuapp.com/api/v1/air-pollution](https://sos2021-03.herokuapp.com/api/v1/air-pollution) (developed by [Joan Villalonga Alvaro](https://github.com/joavilalv))</a></div>
	<div><a href="https://documenter.getpostman.com/view/9683446/TzJoE1Zk">- POSTMAN: https://documenter.getpostman.com/view/9683446/TzJoE1Zk</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/international-tourisms">[https://sos2021-03.herokuapp.com/api/v1/international-tourisms](https://sos2021-03.herokuapp.com/api/v1/international-tourisms) (developed by [Paula Garrido Lerma](https://github.com/Paula0008))</a></div>
	<div><a href="https://documenter.getpostman.com/view/14967959/TzJoF1Kp">- POSTMAN: https://documenter.getpostman.com/view/9683446/TzJoE1Zk</a>
	<a href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">[https://sos2021-03.herokuapp.com/api/v1/quality-of-life](https://sos2021-03.herokuapp.com/api/v1/international-tourisms) (developed by [Ayman Alaoui Mhammedi](https://github.com/AymanAlaouiMhammedi))</a></div>
	
	<ul>
		<li><a href="https://sos2021-10.herokuapp.com/api/v1/air-pollution">Air-pollutions deaths</a> (developed by Joan Villalonga)</li>
		<li><a href="https://sos2021-10.herokuapp.com/api/v1/inter-tourisms">Inter Tourism</a> (developed by Paula Garrido Lerma)</li>
		<li><a href="https://sos2021-10.herokuapp.com/api/v1/quality-of-life">Quality of life</a> (developed by Ayman)</li>
	</ul>

	<ul>
		
		<li>Muertes por contaminación del aire: 
			<p>
				<Button outline color="primary" on:click={toggleob}>Abrir</Button>
				<Modal isOpen={openob} {toggleob} size= 'lg'>
					<ModalHeader {toggleob}>Estadísticas de muertes por contaminación del aire</ModalHeader>
					<ModalBody>
						<AirPollution/>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" on:click={toggleob}>Close</Button>
					</ModalFooter>
				</Modal>
			</p>
		</li>
		<li>Datos de turismo internacional: 
			<p>
				<Button outline color="primary" on:click={toggleob}>Abrir</Button>
				<Modal isOpen={openob} {toggleob} size= 'lg'>
					<ModalHeader {toggleob}>Estadísticas de turismo internacional</ModalHeader>
					<ModalBody>
						<InterTourism/>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" on:click={toggleob}>Close</Button>
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