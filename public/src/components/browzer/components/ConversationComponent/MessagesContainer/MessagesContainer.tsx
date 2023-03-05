import React from 'react';
import {useActions, useMySelector} from "../../../../../hooks/redux";
import {useInputValue} from "../../../../../hooks/useInputValue";
import {useLazySendMessageQuery} from "../../../../../store/messages/messages.api";
import {getRandomID} from "../../../../../../../utils/helpers";
import {IMessage} from "../../../../../../../interfaces/messages";
import {SourceType} from "../../../../../../../enums/messages";
import css from './MessagesContainer.module.scss';
import BigButton from "../../../../UI/Buttons/BigButton/BigButton";
import Message from "./Message/Message";
import Vertical from "../../../../UI/Lists/Vertical/Vertial/Vertical";
import TextArea from "../../../../UI/Inputs/Textarea/TextArea";

const MessagesContainer = (props: { activeConversation: string }) => {
    const auth = useMySelector((state) => state.auth);
    const messages = useMySelector((state) => state.messages);
    const {setMessageStatus, addMessage} = useActions();
    const messageInput = useInputValue('');
    const [dispatchSendMessage, {}] = useLazySendMessageQuery();

    const sendMessage = function () {
        const tempId = getRandomID();
        const message: IMessage = {
            changed: false,
            conversationId: props.activeConversation,
            creationTime: Date.now(),
            from: {
                type: SourceType.USER,
                name: auth.login
            },
            id: tempId,
            text: messageInput.value,
            error: false,
            loading: true
        };

        addMessage(message);

        dispatchSendMessage({
            auth: auth.authKey,
            conversationId: props.activeConversation,
            text: messageInput.value,
            tempId: tempId
        })
            .then(({ data }) => {
                if (data !== false && data !== undefined) {
                    setMessageStatus({
                        id: tempId,
                        conversationId: props.activeConversation,
                        error: false,
                        loading: false
                    })
                }
            })
            .catch(() => {

            })

        messageInput.setValue('');
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <TextArea
                    hook={messageInput}
                    placeholder={'Сообщение'}
                    onSubmit={(message: string) => {
                        console.log(message);
                        sendMessage()
                    }}
                    className={css.messageInput}
                />
                <BigButton
                    active={messageInput.valid && !messageInput.empty}
                    className={css.button}
                    onClick={() => sendMessage()}
                >
                    {">"}
                </BigButton>
            </div>
            <Vertical style={{
                maxHeight: 'calc(100% - 45px)',
                minHeight: 'calc(100% - 45px)',
                overflow: 'auto'
            }}>
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
        </div>
    );
};

export default MessagesContainer;