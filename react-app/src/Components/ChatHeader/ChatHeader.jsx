import React from 'react'
import { Button, Card, Col, Placeholder, Row, Spinner } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
import s from './ChatHeader.module.css'

/*
props:
    showSkeleton        : bool      - Показать скелетон?
    avatar              : string    - URL аватара
    name                : string    - Название     
    hasInFavorites      : bool      - Есть в избранных?
    onChangeFavorites   : callback  - Колбек изменения статуса избранного
    lockFavoritesBtn    : bool      - Блокировать кнопку статуса избранного
    ownerName           : string    - Имя владельца
    countMessages       : number    - Количество сообщений
    countMembers        : number    - Количество участников
*/
function ChatHeader(props) {

    if(props.showSkeleton) {
        return (
            <Card>
                <Card.Body>
                    <Placeholder animation="wave">
                        <Row className='w-100 m-0'>
                            <Col className={`${s.content} p-0 justify-content-center justify-content-md-start`} xs={12} md={5} lg={7}>
                                <Placeholder className={s.avatar}></Placeholder>
                                <div className={s.info}>
                                    <Placeholder className={`${s.skeletonName} ${s.name}`}/>
                                    <Placeholder.Button 
                                        variant='success'
                                        size="sm"
                                        className={s.skeletonButtonSave}
                                    />
                                    <Placeholder.Button 
                                        variant='warning'
                                        size="sm"
                                        className={s.skeletonButtonFavorites}
                                    />
                                </div>
                            </Col>
                            <Col className={`${s.stats} justify-content-center justify-content-md-end mt-3 mt-md-0`} xs={12} md={7} lg={5}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th><Placeholder className={s.skeletonTableTitle}/></th>
                                            <th><Placeholder className={s.skeletonTableTitle}/></th>
                                            <th><Placeholder className={s.skeletonTableTitle}/></th>
                                        </tr>
                                        <tr>
                                            <td><Placeholder className={s.skeletonTableCell}/></td>
                                            <td><Placeholder className={s.skeletonTableCell}/></td>
                                            <td><Placeholder className={s.skeletonTableCell}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Placeholder>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            <Card>
                <Card.Body>
                    <Row className='w-100 m-0'>
                        <Col className={`${s.content} p-0 justify-content-center justify-content-md-start`} xs={12} md={5} lg={7}>
                            <img src={props.avatar} className={s.avatar}></img>
                            <div className={s.info}>
                                <h2 className={s.name}>{props.name}</h2>
                                <Button
                                    variant='success'
                                    size="sm"
                                >
                                    Скачать .csv
                                </Button>
                                <Button 
                                    variant={props.hasInFavorites ? 'outline-warning' : 'warning'}
                                    size="sm"
                                    className='ms-2'
                                    disabled={props.lockFavoritesBtn}
                                    onClick={(e) => props.onChangeFavorites()}
                                >
                                    {props.lockFavoritesBtn ? 
                                        (<Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                        />) 
                                        : 
                                        props.hasInFavorites ? (<Star size={15}></Star>) : (<StarFill size={15}></StarFill>)
                                    }
                                </Button>
                            </div>
                        </Col>
                        <Col className={`${s.stats} justify-content-center justify-content-md-end mt-3 mt-md-0`} xs={12} md={7} lg={5}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Создатель</th>
                                        <th>Сообщений</th>
                                        <th>Участников</th>
                                    </tr>
                                    <tr>
                                        <td>{props.ownerName}</td>
                                        <td>{props.countMessages}</td>
                                        <td>{props.countMembers}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default ChatHeader