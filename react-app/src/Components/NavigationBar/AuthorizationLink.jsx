import Nav from 'react-bootstrap/Nav';

export default function AuthorizationLink(props) {
  return (
    <Nav className = 'me-right'>
        <Nav.Link href = {props.link}>{props.text}</Nav.Link>
    </Nav>
  )
}