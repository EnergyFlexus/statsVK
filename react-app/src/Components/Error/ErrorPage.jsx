import React, { useState} from 'react'
import { useEffect } from 'react';
import pudge from '../../assets/mem.jpg'
import { Button} from 'react-bootstrap';

let count = 0;

export default function ErrorPage() {
const [flip, setFlip] = useState(0);
const [direct, setDirect] = useState(0);

const countFlip = () => {
    count += 90;
    setFlip(count);
};
useEffect(() => {
    setDirect(flip);
},[flip])
return (
    <>
        <Button variant = 'danger' onClick={event => {countFlip()}}>Перевернуть мясника</Button>
        <img style={{height: '100%', width: '100%', transform: `rotate(${direct}deg)`}}
        src={pudge}
        alt =''/>
    </>
  )
}
