import TopNavigationButton from "./TopNavigationButton";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function TopNavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <TopNavigationButton text = "Чаты"/>
                <TopNavigationButton text = "FAQ"/>
                <TopNavigationButton text ="Авторизация"/>
            </Container>
        </Navbar>
    )
}