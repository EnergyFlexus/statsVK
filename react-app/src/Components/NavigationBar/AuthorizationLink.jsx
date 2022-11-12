import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap'

export default function AuthorizationLink(props) {
  return (
    <Nav className = 'me-right'>
        <LinkContainer to = {props.link}><Nav.Link>{props.text}</Nav.Link></LinkContainer>
    </Nav>
  )
}