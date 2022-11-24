import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import wk from '../assets/icons-main/wk.png';
function Main() {
	return (
        <>
            <Container fluid style={{ backgroundColor:'	#282c34', color: "#FFFFFF", height: '100%', flexGrow:'1'}}>
                <Row>
                    <Container>
                        <Row style={{marginTop: '10%'}}>
                            <Col className='ms-5'>
                                <div style={{paddingTop: '10%'}}>
                                    <h1 style ={{display:'block', fontSize:'2em',
                                    marginTop:'0px', marginBottom:'1px',fontWeight: 'bold'}}>VKStatsBot
                                        <p style={{fontWeight: 'normal', fontSize: '25px'}}>Добро пожаловать на сайт бота!</p>
                                    </h1>
                                    <div>
                                        <Button variant='light' className='me-3' onClick={(event) => {
                                            window.open('https://vk.com/club181354529')
                                        }}>Добавить бота</Button>
                                                
                                        <Link to="/faq">
                                            <Button variant='outline-light'>
                                                Получить помощь
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                                <Col>
                                <div>
                                    <img
                                        src = {wk}
                                        className='ms-6'
                                        alt = 'legendarnych'
                                        width='320px'
                                        heigth='280px'/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
            <Container fluid style={{ backgroundColor:'	#282c34', color: "#FFFFFF"}}>
                <Row style={{marginTop:'auto', backgroundColor:'#212529', minHeight:'10%'}}>
                    <Container fluid style={{color: "#FFFFFF", height: '100%'}}>
                        <Row>
                            <Col className='ms-5'>
                                <div style={{padding:'7%'}}>
                                            
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'7%'}}>
                                            Количество бесед:
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'7%'}}>
                                            Количество участников:
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </>
  	);
}

export default Main;
