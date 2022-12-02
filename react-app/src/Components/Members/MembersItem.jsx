import React from 'react'
import { Placeholder } from 'react-bootstrap';
import declinationOfNum from '../../functions/declinationOfNum';
import s from './MembersItem.module.css';

/*
props:
    showSkeleton    : bool      - Показать скелетон (Анимация прогрузки) 
    avatar          : string    - URL картика аватара
    vkId            : number    - ID страницы в VK
    messagesCount   : number    - Количество сообщений
    name            : string    - Имя (Иван Иванов)
*/
function MembersItem(props) {
    const userUrlVkProfile = `https://vk.com/id${props.vkId}`;

    if(props.showSkeleton) {
        return (
            <Placeholder animation="wave" className={s.main}>
                <Placeholder className={`${s.avatar}`}/>
                <div className={s.content}>
                    <div className={s.firstRow}>
                        <Placeholder className={s.skeletonAuthor}/>
                    </div>
                    <Placeholder className={s.skeletonLastRow}/>
                </div>
            </Placeholder>
        )
    } else {
        return (
            <div className={s.main}>
                <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><img src={props.avatar} className={s.avatar} alt=''></img></a>
                <div className={s.content}>
                    <div className={s.firstRow}>
                        <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><span className={s.author}>{props.name}</span></a>
                    </div>
                    <div className={s.lastRow}>{`${props.messagesCount} ${declinationOfNum(props.messagesCount, ['сообщение', 'сообщения', 'сообщений'])}`}</div>
                </div>
            </div>
        )
    }
}

export default MembersItem