import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button, CloseButton, Card} from 'react-bootstrap';
import logo from '../assets/icons/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
	const [validated, setValidated] = useState(false);
	const [response, setResponse] = useState('');
	const [errors, setErrors] = useState({email: true, password: true});
	const [form, setForm] = useState({email: '', password: ''});
	

	const onSubmit = (event) => {
		event.preventDefault();

		//Если все поля заполнены
		if(Object.values(errors).includes(true) === false){
			setResponse('Пользователь не найден')
		} 
		else {
			!validated && setValidated(true);
		}
	};

	const setInput = (input, value) => {
		setForm({
			...form,
			[input]:value
		})
		setErrors({
			...errors,
			[input]:value.length < 1
		});
	}

	return (
    	<div>
			<Container className='d-flex flex-column align-items-center mt-5'>
				<div style={{maxWidth: '325px', width: '100%'}}>
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
						<h1>Авторизация</h1>
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
									<Form.Label>Email или имя пользователя</Form.Label>
									<Form.Control 
										type="text" 
										required 
										value={form.email} 
										onChange={e => setInput('email', e.target.value)}
										isInvalid={validated && errors.email}
									/>
									<Form.Control.Feedback type="invalid">
										Заполните поле
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className='mb-3'>
									<Form.Label className='d-flex justify-content-between'>
										<span>Пароль</span>
										<Link to='/pass_reset'><small>Забыли пароль?</small></Link>
									</Form.Label>
									<Form.Control
										type="password" 
										required 
										value={form.password} 
										onChange={e => setInput('password', e.target.value)}
										isInvalid={validated && errors.password}
									/>
									<Form.Control.Feedback type="invalid">
										Заполните поле 
									</Form.Control.Feedback>
								</Form.Group>
								<Button variant="primary" type='submit' className='w-100'>
									Войти
								</Button>
							</Form>
						</Card.Body>
					</Card>
					<Card className='w-100'>
						<Card.Body className='text-center'>
							<span>Нет аккаунта? <Link to='/signup'>Создать аккаунт</Link></span> 
						</Card.Body>
					</Card>
				</div>
			</Container>
	 	</div>
  	);
}

export default SignIn;
