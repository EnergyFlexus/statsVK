import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';

const navLinkStyle = {
    marginTop: 3,
}

function NavigationLinks(props) {
    const pages = props.pages;
    const listPages = pages.map((item) => (
        <LinkContainer to = {item.link}>
            <Nav.Link key = {item.id} style={navLinkStyle}>{item.text}</Nav.Link>
        </LinkContainer>
    ));
    return (
        <Nav className = 'me-auto' >
            {listPages};
        </Nav> 
    );
}
export default NavigationLinks;