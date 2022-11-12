import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

import TopNavigationLinks from './TopNavigationLinks';
import TopNavigationLogo from './TopNavigationLogo';
import TopAuthorizationLink from './TopAuthorizationLink';

const pages = [
    {id: 0, text: 'Главная', link: '/'},
    {id: 1, text: 'Чаты', link: '/chats'},
    {id: 2, text: 'F.A.Q.', link: '/faq'},
];

function TopNavigationBar(props) {
    return (
        <Navbar fixed ='top' collapseOnSelect bg="dark" expand="xl" variant='dark'>
            <Container>
                <NavbarToggle aria-controls='responsive-navbar-nav'/>
                <NavbarCollapse id='responsive-navbar-nav'>
                    <TopNavigationLogo link = '/'/>
                    <TopNavigationLinks pages = {pages}/>
                    <TopAuthorizationLink link="/" text = "Авторизация"/>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default TopNavigationBar;