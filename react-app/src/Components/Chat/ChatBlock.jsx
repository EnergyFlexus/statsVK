import React, { useEffect, useRef } from 'react'
import s from './ChatBlock.module.css'
import ChatItem from './ChatItem'

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Нояб','Дек'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    date = date < 10 ? '0'.concat(date) : date;
    var hour = a.getHours();
    hour = hour < 10 ? '0'.concat(hour) : hour;
    var min = a.getMinutes();
    min = min < 10 ? '0'.concat(min) : min;
    var time = `${date} ${month} ${hour}:${min}`;
    return time;
}

function ChatBlock(props) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom()
    }, []);

    return (
        <div className={s.main}>
            {props.messages.map((msg, index) => {
                const isAuthorPrevious = index > 0 && msg.date - props.messages[index-1].date < 300 ? props.messages[index-1].user_id === msg.user_id : false;
                return (<div className={isAuthorPrevious || index === 0 ? s.itemMarginSmall : s.itemMargin}>
                    <ChatItem 
                        text={msg.text}
                        userVkId={msg.user_id}
                        date={timeConverter(msg.date)}
                        authorName={msg.name}
                        avatar={msg.avatar}
                        isOnlyText={isAuthorPrevious}
                        key={msg.message_id}
                    />
                </div>
            )})}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatBlock