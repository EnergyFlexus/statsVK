import Nav from 'react-bootstrap/Nav'

const navLinkStyle = {
    marginTop: 3,
}

function TopNavigationLinks(props) {
    const pages = props.pages;
    const listPages = pages.map((item) => (
        <Nav.Link key = {item.id} style={navLinkStyle} href = {item.link}>{item.text}</Nav.Link>
    ));
    return (
        <Nav className = 'me-auto' >
            {listPages};
        </Nav> 
    );
}
export default TopNavigationLinks;