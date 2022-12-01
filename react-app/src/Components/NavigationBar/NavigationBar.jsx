import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavigationLinks from './NavigationLinks';
import { ChatFill, HouseFill, PersonFill, QuestionCircleFill } from 'react-bootstrap-icons';
import s from './NavigationBar.module.css'

const pages = [
    {id: 0, text: 'Главная', icon: <HouseFill/>, link: '/'},
    {id: 1, text: 'Чаты', icon: <ChatFill/>, link: '/chats'},
    {id: 2, text: 'F.A.Q.', icon: <QuestionCircleFill/>, link: '/faq'},
    {id: 3, text: 'Войти', icon: <PersonFill/>, link: '/signin'},
];

function NavigationBar(props) {
    return ( 
        <Navbar collapseOnSelect bg="dark" variant='dark' className={s.bar}>
            <Container>
                <NavbarCollapse id='responsive-navbar-nav'>
                    <NavigationLinks pages = {pages}/>
                </NavbarCollapse>
            </Container>
        </Navbar> 
    )
}

export default NavigationBar;
