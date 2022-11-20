import React from 'react'
import s from './MembersBlock.module.css';
import MembersItem from './MembersItem';

function MembersBlock(props) {
    return (
        <div className={s.main}>
            {props.members.map((member, index) => (
                <div className={index > 0 && s.itemMargin}>
                    <MembersItem 
                        name={member.name}
                        vkId={member.vkId}
                        avatar={member.avatar}
                    />
                </div>
            ))}
        </div>
    )
}

export default MembersBlock