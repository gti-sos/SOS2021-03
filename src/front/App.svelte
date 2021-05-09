<script>
	import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Dropdown,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'sveltestrap';
	let isOpen=false;
	let isOpena=false;
	let isOpenb=false;
	import Router from 'svelte-spa-router';
	import NotFound from './NotFound.svelte';
	

	
	import App from './principal.svelte';

    import AirPollution from './air-pollution/HomeAirPollution.svelte';
    import Landing from './Landing.svelte';
	import EditAirPollution from './air-pollution/EditAirPollution.svelte';
	import InterTourism from './Inter-tourism/HomeInterTourism.svelte';
	import EditIntertourism from './Inter-tourism/EditInterTourism.svelte';

    
	
	const routes = {
		"/": Landing,
		"/info": App,
        "/air-pollution": AirPollution,
		"/air-pollution/:country/:year": EditAirPollution,
		"/international-tourisms": InterTourism,
		"/international-tourisms/:country/:year": EditIntertourism,
        "*": NotFound
	}
	
 
  
</script>
<main>
	<body >
		<Navbar color="light" light expand="md" >
			<Nav navbar >
			  <NavItem  >
				<NavLink  active href="#/">Inicio</NavLink>
			  </NavItem>
			  <NavItem  >
				<NavLink  active href="#/info">Información</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink href="#/air-pollution">Contaminación del aire</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink href="#/international-tourisms">Turismo Internacional</NavLink>
			  </NavItem>
			  <Dropdown  nav {isOpen} toggle="{() => isOpen = !isOpen}" >
				<DropdownToggle nav caret>
				  APIs
				</DropdownToggle>
				<DropdownMenu>
				  <DropdownItem href="https://sos2021-03.herokuapp.com/api/v1/air-pollution">Contaminación del aire</DropdownItem>
				  <DropdownItem href="https://sos2021-03.herokuapp.com/api/v1/international-tourisms">Turismo internacional</DropdownItem>
				  <DropdownItem href= "https://sos2021-03.herokuapp.com/api/v1/quality-of-life">Calidad de vida</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			  <Dropdown  nav {isOpenb} toggle="{() => isOpenb = !isOpenb}" >
				<DropdownToggle nav caret>
				  Postman
				</DropdownToggle>
				<DropdownMenu>
				  <DropdownItem header>Recursos</DropdownItem>
				  <DropdownItem href="https://documenter.getpostman.com/view/14974548/TzJoE1G7">Contaminación del aire</DropdownItem>
				  <DropdownItem href="https://documenter.getpostman.com/view/9683446/TzJoE1Zk">Turismo internacional</DropdownItem>
				  <DropdownItem href= "https://documenter.getpostman.com/view/14967959/TzJydbsW">Calidad de vida</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown  nav {isOpena} toggle="{() => isOpena = !isOpena}" >
				<DropdownToggle nav caret>
				  Github
				</DropdownToggle>
				<DropdownMenu>
				  <DropdownItem header>Individual</DropdownItem>
				  <DropdownItem href="https://github.com/joavilalv">Joan</DropdownItem>
				  <DropdownItem href="https://github.com/Paula0008">Paula</DropdownItem>
				  <DropdownItem href= "https://github.com/AymanAlaouiMhammedi">Ayman</DropdownItem>
				  <DropdownItem divider />
				  <DropdownItem header>Grupal</DropdownItem>
				  <DropdownItem href="https://github.com/gti-sos/SOS2021-03.git">Todos</DropdownItem>
				</DropdownMenu>
			</Dropdown>			
			</Nav>
		</Navbar>
	
	</body>
	<Router {routes}/>
</main>