import React from 'react'
import s from './MembersItem.module.css';

function MembersItem(props) {
    const userUrlVkProfile = `https://vk.com/id${props.vkId}`;

    return (
        <div className={s.main}>
            <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><img src={props.avatar} className={s.avatar}></img></a>
            <div className={s.content}>
                <div className={s.firstRow}>
                    <a href={userUrlVkProfile} target="_blank" rel="noreferrer"><span className={s.author}>{props.name}</span></a>
                </div>
                <div className={s.lastRow}></div>
            </div>
        </div>
    )
}

export default MembersItem