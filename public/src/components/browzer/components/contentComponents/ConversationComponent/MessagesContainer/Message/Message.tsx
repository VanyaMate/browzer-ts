import React, {memo} from 'react';
import {IMessage} from "../../../../../../../../../interfaces/messages";
import css from './Message.module.scss';
import MyMessage from "./MyMessage/MyMessage";
import AnotherMessage from "./AnotherMessage/AnotherMessage";

const Message = memo((props: { message: IMessage, my: boolean }) => {
    return props.my ?
        <MyMessage message={props.message}/> :
        <AnotherMessage message={props.message}/>;
});

export default Message;