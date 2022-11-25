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
                <Row style={{marginTop:'auto', backgroundColor:'#212529', padding:'1%'}}>
                    <Container fluid style={{color: "#FFFFFF", height: '100%'}}>
                        <Row>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" 
                                class="bi bi-envelope" viewBox="0 0 16 16" style={{marginRight:'1%'}}>
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 
                                    4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 
                                    3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"></path>
                                </svg>
                                    Сообщений: {items.messages_count}
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" 
                                class="bi bi-chat-heart" viewBox="0 0 16 16" style={{marginRight:'1%'}}>
                                    <path fill-rule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 
                                    1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 
                                    1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 
                                    3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 
                                    4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 
                                    21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                                    Чатов: {items.chats_count}
                                </div>
                            </Col>
                            <Col className='ms-5'>
                                <div style={{padding:'1%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" 
                                class="bi bi-people" viewBox="0 0 16 16" style={{marginRight:'1%'}}>
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 
                                    0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 
                                    0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 
                                    7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35
                                     0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 
                                     5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 
                                     6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                </svg>
                                    Участников: {items.users_count}
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
