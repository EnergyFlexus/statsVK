import React from 'react'
import s from './MembersBlock.module.css';
import MembersItem from './MembersItem';

/*
props:
    showSkeleton        : bool      - Показать скелетон (Анимация прогрузки) 
    countSkeletonItems  : number    - Количество скелетонов
    members             : array     - Пользователи
*/
function MembersBlock(props) {
    if(props.showSkeleton) {
        return (
            <div className={s.main}>
                {[...Array(props.countSkeletonItems)].map((x, i) =>
                    <MembersItem showSkeleton={true} key={i}/>
                )}
            </div>  
        )
    } else {
        return (
            <div className={s.main}>
                {props.members.map((member, index) => (
                    <div className={index > 0 ? s.itemMargin : undefined} key={index}>
                        <MembersItem 
                            showSkeleton={props.showSkeleton}
                            name={`${member.first_name} ${member.last_name}`}
                            vkId={member.id}
                            avatar={member.photo_50}
                            messagesCount={member.messages_count}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default MembersBlock