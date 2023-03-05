import React, {useMemo} from 'react';
import css from './ConversationItem.module.scss';
import MediumIcon from "../../../../../UI/Icons/MediumIcon/MediumIcon";
import {IConversation} from "../../../../../../../../interfaces/conversations";
import {IPublicUserData} from "../../../../../../../../interfaces/users";
import {useMySelector} from "../../../../../../hooks/redux";

const ConversationItem = (props: {
    conversation: IConversation<IPublicUserData<string>>,
    always: boolean
}) => {
    const {auth, messages} = useMySelector(state => state);
    const {name, icon} = useMemo(() => {
        const data = { name: '', icon: '' };

        if (props.conversation.name) {
            data.name = props.conversation.name;
        } else {
            const member = props.conversation.members.filter(
                (member) => member.login !== auth.login
            )[0];

            if (member) {
                data.name = member.login;

                if (props.conversation.icon) {
                    data.icon = props.conversation.icon;
                } else {
                    data.icon = member.data?.avatar ?? '';
                }
            }
        }

        return data;
    }, [props.conversation.name, props.conversation.icon, props.conversation.members])

    return (
        <div className={[css.container, props.always ? css.always : ''].join(' ')}>
            <div className={css.icon}>
                <MediumIcon br src={ icon }/>
            </div>
            <div className={css.info}>
                <div className={css.name}>{ name }</div>
                <div className={css.message}>{
                    messages[props.conversation.id]?.messages[
                        messages[props.conversation.id]?.messages.length - 1
                    ]?.text || ''
                }</div>
            </div>
        </div>
    );
};

export default ConversationItem;