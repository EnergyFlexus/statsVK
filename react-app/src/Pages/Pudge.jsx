import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import pudge from './../assets/icons/pudge.png'

const styleSpin = {
	width: 400,
	heigth: 200,
	marginLeft: '35%',
	marginRight: '35%',
	animation: 'spin 2s linear 0s infinite',
};

const styleStop = {
	width: 400,
	heigth: 200,
	marginLeft: '35%',
	marginRight: '35%',
};

function Pudge() {
	const [style, setStyle] = useState(styleStop);
  	return (
		<div >
			<img className='pudge'
			src={pudge}
			alt=''
			style={style}/>
			<Button onClick={(e) => {
				setStyle(styleSpin);
			}}>КРУТИТЬ МЯСНИКА</Button>
			<Button className='ms-2' onClick={(e) => {
				setStyle(styleStop);
			}}>ОСТАНОВИТЬ МЯСНИКА</Button>
		</div>
    	
  	);
}

export default Pudge;