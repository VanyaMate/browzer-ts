import React, {memo} from 'react';
import Message from "../Message/Message";
import Vertical from "../../../../../../UI/Lists/Vertical/Vertial/Vertical";
import css from './MessagesList.module.scss';
import {useMySelector} from "../../../../../../../hooks/redux";
import NotifyContent from "./NotifyContent/NotifyContent";

const MessagesList = memo((props: { activeConversation: string }) => {
    const auth = useMySelector((state) => state.auth);
    const messages = useMySelector((state) => state.messages);

    return (
        <Vertical className={css.container}>
            <NotifyContent hide={messages[props.activeConversation]?.messages.length !== 0}>Так пусто... ┐(‘～` )┌</NotifyContent>
            {
                messages[props.activeConversation]?.messages.map((message) => {
                    return <Message
                        key={message.id}
                        message={message}
                        my={auth.login === message.from.name}
                    />
                }).reverse()
            }
        </Vertical>
    );
});

export default MessagesList;