import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import logo from './fire-2-32.png'

function TopNavigationLogo() {
    return (
        <NavbarBrand>
            <img src ={logo}
            height = '30'
            width= '30'
            className='d-inline-block align-top'
            alt = "Logo"
            />
        </NavbarBrand>
    )
}

export default TopNavigationLogo;