import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button, CloseButton, Card} from 'react-bootstrap';
import logo from '../assets/icons/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
	const [validated, setValidated] = useState(false);
	const [response, setResponse] = useState('');
	const [errors, setErrors] = useState({nickname: true, password: true, passwordRepeat: true});
	const [form, setForm] = useState({passwordRepeat: '', nickname: '', password: ''});
	

	const onSubmit = (event) => {
		event.preventDefault();

		//Если все поля заполнены
		if(Object.values(errors).includes(true) === false){
			setResponse('Аккаунт с таким именем уже зарегистрирован')
		} 
		else {
			!validated && setValidated(true);
		}
	};

	const setInput = (input, value) => {
		let error = false;
		if(input === 'nickname' ) {
			error = !/^[a-zA-Z0-9-_.]{3,24}$/.test(value);
		}
		else if(input === 'password' ) {
			error = !/^[a-zA-Z0-9-_!@#$?%^&*.]{6,24}$/.test(value);
		}
		else if(input === 'passwordRepeat' ) {
			error = value !== form.password;
		}

		setForm({
			...form,
			[input]:value
		});

		setErrors({
			...errors,
			[input]:error
		});
	}

	return (
    	<div>
			<Container className='d-flex flex-column align-items-center mt-5' style={{ width: '22rem' }}>
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
					<h1>Регистрация</h1>
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
								<Form.Label>Имя пользователя</Form.Label>
								<Form.Control 
									type="text" 
									required 
									value={form.nickname} 
									onChange={e => setInput('nickname', e.target.value)}
									isInvalid={validated && errors.nickname}
								/>
								<Form.Control.Feedback type="invalid">
									Имя должно быть длинной от 3 до 24 символов и состоять из латинских букв, цифр, символов(-._)
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>
									Пароль
								</Form.Label>
								<Form.Control
									type="text" 
									required 
									value={form.password} 
									onChange={e => setInput('password', e.target.value)}
									isInvalid={validated && errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									Пароль должен быть длинной от 6 до 24 символов и состоять из латинских букв, цифр, символов(!@#$?%^&*-._)
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>
									Повторите пароль
								</Form.Label>
								<Form.Control
									type="text" 
									required 
									value={form.passwordRepeat} 
									onChange={e => setInput('passwordRepeat', e.target.value)}
									isInvalid={validated && errors.passwordRepeat}
								/>
								<Form.Control.Feedback type="invalid">
									Пароли не совпадают
								</Form.Control.Feedback>
							</Form.Group>
							<Button variant="primary" type='submit' className='w-100'>
								Зарегистрироваться
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<Card className='w-100'>
					<Card.Body className='text-center'>
						<span>Есть аккаунт? <Link to='/signin'>Войти в аккаунт</Link></span> 
					</Card.Body>
				</Card>
			</Container>
	 	</div>
  	);
}

export default SignUp;
