import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Placeholder} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import wk from '../assets/icons-main/wk.png';
import s from './Main.module.css'
import icon from '../assets/icons/logo.svg'
import { People, PeopleFill } from 'react-bootstrap-icons';

function Main() {
    const [error, setError] = useState();
    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getCountUsers = '/api/ChatUsersCount';
        const getCountMessages = '/api/MessagesCount';
        const getChatsCount = '/api/ChatsCount';
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
            result.messages_count = await fetching(getCountMessages);
            result.chats_count = await fetching(getChatsCount);
            result.users_count = await fetching(getCountUsers);

            return result;
        });
        const messageAr = (async () => {
            setItems(await prepareItems());
            setIsLoaded(true);
        });
        
        messageAr();
    },[]);
    
	return (
        <div className={s.main}>
            <Container className={s.firstContainer}>
                <Row className='justify-content-center'>
                    <Col md={7} className={s.landingCol}>
                        <img
                            src = {icon}
                            alt='VkStats'
                            width={200}
                            className={s.logo}
                        />
                        <div className={s.landingContent}>
                            <h1 className={s.landingTitle}>VKStatsBot</h1>
                            <h4 className={s.landingDesc}>Добро пожаловать на сайт бота!</h4>
                            <div className={s.landingButtons}>
                                <Button variant='light' className='me-3'>Добавить бота</Button>
                                <Link to="/faq">
                                    <Button variant='outline-light'>
                                        Получить помощь
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
            <Container fluid className={s.fluidContainer}>
                <Container className={s.statsContainer}>
                    <div>{
                        isLoaded ? 
                        (<span className={s.statsText}>{`Сообщений: ${items.messages_count}`}</span>) 
                        :
                        (<Placeholder className={s.stateSkeleton}/>)
                    }</div>
                    <div>{
                        isLoaded ? 
                        (<span className={s.statsText}>{`Чатов: ${items.chats_count}`}</span>) 
                        :
                        (<Placeholder className={s.stateSkeleton}/>)
                    }</div>
                    <div>{
                        isLoaded ? 
                        (<span className={s.statsText}>{`Участников: ${items.users_count}`}</span>) 
                        :
                        (<Placeholder className={s.stateSkeleton}/>)
                    }</div>
                </Container>
            </Container>
        </div>
  	);
}

export default Main;
