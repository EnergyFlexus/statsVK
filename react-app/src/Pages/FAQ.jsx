import { Container, Accordion, Nav, NavLink} from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';



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
					<p>
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
										2. Перейти в группу ВК.
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
									<NavLink href='https://vk.com/club181354529'>
										https://vk.com/club181354529
									</NavLink>
								</Nav>
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
