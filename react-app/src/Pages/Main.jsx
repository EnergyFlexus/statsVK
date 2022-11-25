import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import wk from '../assets/icons-main/wk.png';
function Main() {
    const [error, setError] = useState();
    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    let footer;
    useEffect(() => {
        const getUrl = '/api/MessagesCountsInChatsAll?order=desc';
        const getUsersUrl = '/api/ChatUsersAll';
        const fetching = (async (url) => {
			try {
				let res = await fetch(url);
				res = await res.json();
                return res;
			} catch (error) {
				setError(error);
			}
		});
        const prepareItems = (async () => {
            let result = {
                messages_count: 0,
                chats_count: 0,
                users_count: 0,
            };
            let items = await fetching(getUrl);
            for(let item of items) {
                result.messages_count += item.messages_count;
                result.chats_count += 1;
            }
            let users = await fetching(getUsersUrl);
            for(let item of users){
                result.users_count += 1;
            }
            return result;
        });
        const messageAr = (async () => {
            setItems(await prepareItems());
            setIsLoaded(true);
        });
        
        messageAr();
    },[]);
    
    if(error) {
		footer = <>Error: {error.message} </>
	} else if(isLoaded) {
		footer =  
            <Container fluid style={{ backgroundColor:'	#282c34', color: "#FFFFFF"}}>
                <Row style={{marginTop:'auto', backgroundColor:'#212529', minHeight:'10%'}}>
                    <Container fluid style={{color: "#FFFFFF", height: '100%'}}>
                        <Row>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                    Сообщений   
                                    <p>{items.messages_count}</p> 
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                    Чатов
                                    <p>{items.chats_count}</p>
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                    Участников
                                    <p>{items.users_count}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
	} else {
		footer = <Loading/>
	}
	return (
        <>
            <Container fluid style={{ backgroundColor:'	#282c34', color: "#FFFFFF", height: '100%', flexGrow:'1'}}>
                <Row>
                    <Container>
                        <Row style={{marginTop: '10%'}}>
                            <Col className='ms-5'>
                                <div style={{paddingTop: '10%'}}>
                                    <h1 style ={{display:'block', fontSize:'2em',
                                    marginTop:'0px', marginBottom:'1px',fontWeight: 'bold', fontSize: '50px'}}>VKStatsBot
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
           <>
              {footer}
           </>
        </>
  	);
}

export default Main;
