import { Container, Accordion, Nav, NavLink, Row, Col} from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import inter from '../assets/icons-tutor/in.png';
import bot from '../assets/icons-tutor/bot.png';

function FAQ() {
  return (
		<>
		<Container>
			<div className='faq'>
				<h1>FAQ</h1>
				<div>
					<p>
						<span>Потребовалось собрать данные беседы? Возникли вопросы?</span>
					</p>
					<p className = 'mb-4'>
						Мы ответим на все ваши животрепещущие вопросы о нашем боте.
					</p>
					<Accordion>
						<AccordionItem eventKey='0'>
							<AccordionHeader>Как начать пользоваться ботом?</AccordionHeader>
							<AccordionBody>
								<div className='acc'>
									<p>
										Для того, чтобы начать пользоваться ботом, вам нужно:
									</p>
									<p>
										1. Зарегистрировать аккаунт на сайте.
									</p>
									<p>
										2. Перейти в <a href='https://vk.com/club181354529' target='_blank' rel='noreferrer'>группу ВК.</a>
									</p>
									<p>
										3. Добавить бота в беседу.
									</p>
									<p>
										4. Выдать права на просмотр истории сообщений
									</p>
									<p>
										После добавления в беседу бот сам начнет сбор информации.
									</p>
								</div>	
							</AccordionBody>
						</AccordionItem>
						<AccordionItem eventKey='1'>
							<AccordionHeader>Где найти ссылку на группу в ВК?</AccordionHeader>
							<AccordionBody>
								<Nav className='mr-auto'>
									<NavLink onClick={(event) => {
										window.open('https://vk.com/club181354529')
									}}>
										Ссылка на группу в вк
									</NavLink>
								</Nav>
							</AccordionBody>
						</AccordionItem>
						<AccordionItem eventKey='2'>
							<AccordionHeader>Как добавить бота в беседу?</AccordionHeader>
							<AccordionBody>
								<Row>
									<Col>
									<div className='acc'>
										<p>
											1. Нажать на кнопку "Добавить в чат".
										</p>
									</div>
									</Col>
									<Col>
										<img
										src = {inter}
                    					className='d-inline-block align-top'
										alt='in'
											/>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className='acc'>
											<p>
												2. Выбрать нужную беседу и добавить бота в чат.
											</p>
										</div>
									</Col>
								</Row>
								<Row>
									<Col>
										<div className='acc'>
											<p>
												3. Выдать боту доступ ко всей переписке.
											</p>
										</div>
									</Col>
									<Col/>
									<Col>
										<img
										src={bot}
										className ='d-inline-block align-top mt-4'
										alt = 'bot-adm'/>
									</Col>
								</Row>
							</AccordionBody>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</Container>
		</>
  	);
}

export default FAQ;
