import React from 'react';
import {useActions, useMySelector} from "../../../../../hooks/redux";
import {useInputValue} from "../../../../../hooks/useInputValue";
import Input from "../../../../UI/Inputs/Input/Input";
import Button from "../../../../UI/Buttons/Button/Button";
import {useLazySendMessageQuery} from "../../../../../store/messages/messages.api";
import {getRandomID} from "../../../../../../../utils/helpers";
import {IMessage} from "../../../../../../../interfaces/messages";
import {SourceType} from "../../../../../../../enums/messages";

const MessagesContainer = (props: { activeConversation: string }) => {
    const auth = useMySelector((state) => state.auth);
    const messages = useMySelector((state) => state.messages);
    const {setMessageStatus, addMessage} = useActions();
    const messageInput = useInputValue('');
    const [dispatchSendMessage, {}] = useLazySendMessageQuery();

    return (
        <div>
            <Input hook={messageInput} placeholder={'Сообщение'}/>
            {
                messages[props.activeConversation]?.messages.map((message) => {
                    return <div key={message.id}>{message.loading ? 'LOADING' : ''} - {message.text}</div>
                }).reverse()
            }
            <Button
                active={messageInput.valid && !messageInput.empty}
                onClick={() => {
                    const tempId = getRandomID();
                    const message: IMessage = {
                        changed: false,
                        conversationId: props.activeConversation,
                        creationTime: Date.now(),
                        from: {
                            type: SourceType.USER,
                            name: ''
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
                }}
            >Отправить</Button>
        </div>
    );
};

export default MessagesContainer;