import React, {memo} from 'react';
import Message from "../Message/Message";
import Vertical from "../../../../../../UI/Lists/Vertical/Vertial/Vertical";
import css from './MessagesList.module.scss';
import {useActions, useMySelector} from "../../../../../../../hooks/redux";
import NotifyContent from "./NotifyContent/NotifyContent";
import ScrollContainer from "../../../../otherComponents/ScrollContainer/ScrollContainer";
import {useLazyGetFromConversationQuery} from "../../../../../../../store/messages/messages.api";

const MessagesList = memo((props: { activeConversation: string }) => {
    const auth = useMySelector((state) => state.auth);
    const messages = useMySelector((state) => state.messages);
    const conversationMess = messages[props.activeConversation];
    const [dispatchGetMessages, {isFetching, isError, data}] = useLazyGetFromConversationQuery();
    const {addMessagesToEnd, setConversationMessagesStatus} = useActions();

    const scrollHandler = function (scrollData: number[]) {
        const [scrollPx, scrollPercent] = scrollData;

        if (scrollPx < 300 && conversationMess && !conversationMess.end && !conversationMess.loading && !isFetching) {
            setConversationMessagesStatus({
                conversationId: props.activeConversation,
                loading: true
            })
            dispatchGetMessages({
                auth: auth.authKey,
                conversationId: props.activeConversation,
                limit: conversationMess.defaultLimit,
                offset: conversationMess.messages.length
            })
                .then(({ data }) => {
                    if (data) {
                        addMessagesToEnd(data);

                        setConversationMessagesStatus({
                            conversationId: props.activeConversation,
                            loading: false,
                            end: data.length < conversationMess.defaultLimit
                        })
                    }
                })
        }
    }

    return (
        <Vertical className={css.container} scrollHandler={scrollHandler}>
            <NotifyContent hide={conversationMess?.messages.length !== 0}>Так пусто... ┐(‘～` )┌</NotifyContent>
            {
                conversationMess?.messages.map((message) => {
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