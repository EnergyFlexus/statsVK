//import TopNavigationButton from "./TopNavigationButton";
//Bootstrap import
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

//import NavigationBar
//import TopNavigationLogo from "./TopNavigationLogo";
import TopNavigationLinks from './TopNavigationLinks';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';



function TopNavigationBar() {
    return (
        <Navbar fixed ='top' collapseOnSelect bg="dark" expand="xl" variant='dark'>
            <Container>
                <NavbarToggle aria-controls='responsive-navbar-nav'/>
                <TopNavigationLinks></TopNavigationLinks>
            </Container>
        </Navbar>
    )
}

export default TopNavigationBar;