import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import {LinkContainer} from 'react-router-bootstrap'

import logo from '../../assets/icons/logo.svg';

export default function NavigationLogo(props) {
    return (
        <LinkContainer to={props.link}>
            <NavbarBrand>
                <img 
                    src ={logo}
                    height = '30'
                    width= '30'
                    className='d-inline-block align-top'
                    alt = "Logo"
                />
            </NavbarBrand>
        </LinkContainer>
    )
}