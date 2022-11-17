import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button, CloseButton, Card } from 'react-bootstrap';
import logo from '../assets/icons/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function PassReset() {
	const [validated, setValidated] = useState(false);
	const [response, setResponse] = useState('');
	const [error, setError] = useState(true);
	const [input, setInput] = useState('');
	
	const onSubmit = (event) => {
		event.preventDefault();

		if(!error){
			setResponse('Аккаунт с указанным email не зарегистрирован');
		} 
		else {
			!validated && setValidated(true);
		}
	};

	const changeInput = (value) => {
		setInput(value);
		setError(value.length < 1);
	}

	return (
    	<div>
			<Container className='d-flex flex-column align-items-center mt-5'>
				<div style={{maxWidth: '450px'}}>
					<div className='d-flex flex-column align-items-center w-100 mb-3'>
						<Link to='/'>
							<img 
								src ={logo}
								height = '60'
								width= '60'
								className='d-inline-block align-top'
								alt = "Logo"
							/>
						</Link>
						<h1>Сброс пароля</h1>
					</div>
					{response && (
						<Card className='w-100 mb-3' border={'danger'}>
							<Card.Body className='d-flex justify-content-between'>
								<span>{response}</span> 
								<CloseButton onClick={event => setResponse('')}></CloseButton>
							</Card.Body>
						</Card>
					)}
					<Card className='w-100 mb-3'>
						<Card.Body>
							<Form noValidate onSubmit={onSubmit}>
								<Form.Group className='mb-3'>
									<Form.Label>Введите подтвержденный адрес электронной почты вашего аккаунта, на который прийдёт новый пароль.</Form.Label>
									<Form.Control 
										type="text" 
										placeholder='Введите ваш email'
										required 
										value={input} 
										onChange={e => changeInput(e.target.value)}
										isInvalid={validated && error}
									/>
									<Form.Control.Feedback type="invalid">
										Заполните поле
									</Form.Control.Feedback>
								</Form.Group>
								<Button variant="primary" type='submit' className='w-100'>
									Отправить письмо
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</div>
			</Container>
	 	</div>
  	);
}

export default PassReset;
