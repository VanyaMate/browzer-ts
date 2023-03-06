import React, {memo} from 'react';
import {IMessage} from "../../../../../../../../../../interfaces/messages";
import css from './MyMessage.module.scss';
import {getStringDate} from "../../../../../../../../../../utils/helpers";
import ClickTextarea from "../../../../../../../UI/Inputs/ClickTextarea/ClickTextarea";
import AbsoluteButton from "../../../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton";
import SmallIcon from "../../../../../../../UI/Icons/SmallIcon/SmallIcon";
import {useLazyChangeMessageQuery, useLazyDeleteMessageQuery} from "../../../../../../../../store/messages/messages.api";
import {useActions, useMySelector} from "../../../../../../../../hooks/redux";

const MyMessage = memo((props: { message: IMessage }) => {
    const auth = useMySelector(state => state.auth);
    const {changeMessageText, removeMessage} = useActions();
    const [dispatchChangeMessage, {isFetching: changeLoading, isError: changeError}] = useLazyChangeMessageQuery();
    const [dispatchDeleteMessage, {isFetching: deleteLoading, isError: deleteError}] = useLazyDeleteMessageQuery();

    return (
        <div className={[
                css.container,
                (props.message.loading || deleteLoading || changeLoading) ? css.loading : '',
                (props.message.error || deleteError || changeError) ? css.error : '',
            ].join(' ')}
        >
            <div className={css.info}>
                <div className={css.headerInfo}>
                    <div className={css.changed}>{ props.message.changed ? '(изм.)' : '' }</div>
                    <div className={css.time}>
                        { getStringDate(props.message.creationTime) }
                    </div>
                    <AbsoluteButton
                        className={css.deleteButton}
                        onClick={() => {
                            dispatchDeleteMessage({ auth: auth.authKey, messageId: props.message.id })
                                .then((status) => {
                                    if (status) {
                                        removeMessage(props.message);
                                    }
                                })
                        }}
                    >
                        X
                    </AbsoluteButton>
                </div>
                <div className={css.message}>
                    {
                        props.message.error ?
                        <AbsoluteButton
                            className={css.tryAgain}
                            onClick={() => {
                                console.log('reload message', props.message.id);
                            }}
                        >
                            <SmallIcon
                                src={'http://localhost:3000/assets/icons/reload.png'}
                                className={[css.reloadIcon]}
                            />
                        </AbsoluteButton> : ''
                    }
                    <ClickTextarea
                        value={props.message.text}
                        className={[css.input]}
                        validator={(v: string) => v.length !== 0}
                        successHandler={(text: string) => {
                            dispatchChangeMessage({ auth: auth.authKey, text, messageId: props.message.id })
                                .then((status) => {
                                    if (status) {
                                        changeMessageText({
                                            conversationId: props.message.conversationId,
                                            messageId: props.message.id,
                                            text
                                        });
                                    }
                                })
                        }}
                    />
                </div>
            </div>
        </div>
    );
});

export default MyMessage;