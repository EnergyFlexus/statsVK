import React from 'react'
import s from './ChatItem.module.css'

function ChatItem(props) {
    const userUrlVkProfile = `https://vk.com/id${props.userVkId}`;

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

export default ChatItem