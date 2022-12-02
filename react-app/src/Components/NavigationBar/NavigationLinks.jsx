import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import s from './NavigationLinks.module.css'


function NavigationLinks(props) {
    const pages = props.pages;
    return (
        <Nav className = {s.nav} >
            {pages.map((item) => (
                <LinkContainer to = {item.link} key = {item.link} className={s.link}>
                    <Nav.Link>
                        <div className={s.icon}>{item.icon}</div>
                        <div className={s.text}>{item.text}</div>
                    </Nav.Link>
                </LinkContainer>
            ))}
        </Nav> 
    );
}
export default NavigationLinks;
