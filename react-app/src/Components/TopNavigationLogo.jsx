import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import logo from './flame.svg';

export default function TopNavigationLogo(props) {
    return (
        <NavbarBrand href={props.link}>
            <img src ={logo}
            height = '30'
            width= '30'
            className='d-inline-block align-top'
            alt = "Logo"
            />
        </NavbarBrand>
    )
}