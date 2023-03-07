import React from 'react';
import {useActions, useMySelector} from "../../../../../../hooks/redux";
import {useInputValue} from "../../../../../../hooks/useInputValue";
import {useLazySendMessageQuery} from "../../../../../../store/messages/messages.api";
import {getRandomID} from "../../../../../../../../utils/helpers";
import {IMessage} from "../../../../../../../../interfaces/messages";
import {SourceType} from "../../../../../../../../enums/messages";
import css from './MessagesContainer.module.scss';
import BigButton from "../../../../../UI/Buttons/BigButton/BigButton";
import TextArea from "../../../../../UI/Inputs/Textarea/TextArea";
import SmallIcon from "../../../../../UI/Icons/SmallIcon/SmallIcon";
import MessagesList from "./MessagesList/MessagesList";
import NotifyContent from "./MessagesList/NotifyContent/NotifyContent";

const MessagesContainer = (props: { activeConversation: string }) => {
    const auth = useMySelector((state) => state.auth);
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
                        newId: data.message.id,
                        error: false,
                        loading: false
                    })
                } else {
                    setMessageStatus({
                        id: tempId,
                        conversationId: props.activeConversation,
                        error: true,
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
            {
                props.activeConversation ?
                    <>
                        <div className={css.header}>
                            <TextArea
                                hook={messageInput}
                                placeholder={'Сообщение'}
                                onSubmit={sendMessage}
                                className={css.messageInput}
                            />
                            <BigButton
                                active
                                className={css.button}
                                onClick={sendMessage}
                            >
                                <SmallIcon
                                    className={[css.icon]}
                                    src={'http://localhost:3000/assets/icons/clip.png'}
                                />
                            </BigButton>
                        </div>
                        <MessagesList activeConversation={props.activeConversation}/>
                    </> :
                    <NotifyContent hide={props.activeConversation !== ''}>Беседа не выбрана ლ(ಠ_ಠ ლ)</NotifyContent>
            }
        </div>
    );
};

export default MessagesContainer;