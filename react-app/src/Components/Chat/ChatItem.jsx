import React from 'react'
import { Placeholder } from 'react-bootstrap';
import s from './ChatItem.module.css'


/*
props:
    showSkeleton    : bool      - Показать скелетон (Анимация прогрузки) 
    isOnlyText      : bool      - Отрисовывать только текст сообщения
    avatar          : string    - URL картика аватара
    authorName      : string    - Имя (Иван Иванов)
    text            : string    - Текст сообщения
    userVkId        : number    - ID страницы в VK
    date            : number    - Время сообщения (UNIX time)
*/
function ChatItem(props) {
    const userUrlVkProfile = `https://vk.com/id${props.userVkId}`;


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
                <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><img src={props.avatar} className={`${s.avatar} ${props.isOnlyText && s.none}`}></img></a>
                <div className={`${s.content} ${props.isOnlyText && s.contentPadding}`}>
                    <div className={`${s.firstRow} ${props.isOnlyText && s.none}`}>
                        <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><span className={s.author}>{props.authorName}</span></a>
                        <span className={s.date}>{props.date}</span>
                    </div>
                    <div className={s.lastRow}>{props.text}</div>
                </div>
            </div>
        )
    }
}

export default ChatItem