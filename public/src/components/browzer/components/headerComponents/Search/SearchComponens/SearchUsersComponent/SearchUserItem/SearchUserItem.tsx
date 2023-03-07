import React, {memo, useMemo} from 'react';
import {IPublicUserData} from "../../../../../../../../../../interfaces/users";
import css from './SearchUserItem.module.scss';
import SmallIcon from "../../../../../../../UI/Icons/SmallIcon/SmallIcon";
import BigButton from "../../../../../../../UI/Buttons/BigButton/BigButton";
import {useLazyCreateConversationQuery} from "../../../../../../../../store/conversations/conversations.api";
import {useActions, useMySelector} from "../../../../../../../../hooks/redux";
import {AccessType} from "../../../../../../../../../../enums/user";
import {IConversation} from "../../../../../../../../../../interfaces/conversations";
import {ConversationType} from "../../../../../../../../../../enums/conversations";
import {serverUrl} from "../../../../../../../../common/consts";

const canCreateConversation = function (user: IPublicUserData<string>, myFriends: IPublicUserData<string>[]) {
    const conversationPref = user.preferences.conversations;
    if (conversationPref === AccessType.ALL) {
        return true;
    } else if (conversationPref === AccessType.FRIENDS && inFriends(user.login, myFriends)) {
        return true;
    } else {
        return false;
    }
}

const conversationExistWith = function (userLogin: string, conversations: IConversation<IPublicUserData<string>>[]) {
    return conversations.some((conversation) => {
        return (conversation.type === ConversationType.SINGLE) && conversation.members.some(
            (member) => member.login === userLogin
        );
    })
}

const conversationAccessWith = function (
    user: IPublicUserData<string>,
    conversations: IConversation<IPublicUserData<string>>[],
    friends: IPublicUserData<string>[]
) {
    return canCreateConversation(user, friends) || conversationExistWith(user.login, conversations);
}

const friendAccessWith = function (user: IPublicUserData<string>, friendsRequestIn: IPublicUserData<string>[]) {
    return (user.preferences.friends === AccessType.ALL) ||
        friendsRequestIn.some((friendRequest) => friendRequest.login === user.login);
}


const inFriends = function (userLogin: string, friendsList: IPublicUserData<string>[]) {
    return friendsList.some((friend) => friend.login === userLogin);
}


const SearchUserItem = memo((props: { user: IPublicUserData<string> }) => {
    const {friends, conversations, auth} = useMySelector((state) => state);
    const [dispatchCreateConversation, {isFetching: conversationCreation}] = useLazyCreateConversationQuery();
    const {addConversation, setMessages} = useActions();
    const isFriend = useMemo(() => inFriends(props.user.login, friends.friends), [props.user, friends.friends]);
    const isFriendRequestOut = useMemo(() => inFriends(props.user.login, friends.requestsOut), [props.user, friends.requestsOut]);
    const isFriendRequestIn = useMemo(() => inFriends(props.user.login, friends.requestsIn), [props.user, friends.requestsIn]);
    const conversationAccess = useMemo(() => conversationAccessWith(props.user, conversations.list, friends.friends), [conversations.list, friends.friends]);
    const friendsAccess = useMemo(() => friendAccessWith(props.user, friends.requestsIn), [props.user, friends.requestsIn]);

    return (
        <div className={css.container}>
            <div className={css.avatar}>
                <SmallIcon br src={props.user.avatar}/>
            </div>
            <div className={css.login}>{props.user.login}</div>
            <div className={css.control}>
                <BigButton
                    // TODO: Может быть сюда добавлять проверку на isFetching
                    active={conversationAccess}
                    className={[css.message, css.button, conversationCreation ? css.loading : ''].join(' ')}
                    onClick={() => {
                        if (!conversationCreation && !conversationExistWith(props.user.login, conversations.list)) {
                            // create conversation
                            // add to conversation.list and messages
                            dispatchCreateConversation({
                                auth: auth.authKey,
                                type: ConversationType.SINGLE,
                                members: [props.user.login]
                            })
                                .then(({ data }) => {
                                    if (data) {
                                        addConversation(data);
                                        setMessages([data]);
                                    }
                                })
                        }

                        // open conversation
                    }}
                >
                    <SmallIcon
                        src={`${serverUrl}/assets/icons/messenger.png`}
                        className={[css.buttonIcon]}
                    />
                </BigButton>
                <BigButton
                    active={friendsAccess}
                    className={[css.addFriend, css.button].join(' ')}
                    onClick={() => {

                    }}
                >
                    <SmallIcon
                        src={`${serverUrl}/assets/icons/high-five.png`}
                        className={[css.buttonIcon]}
                    />
                </BigButton>
            </div>
        </div>
    );
});

export default SearchUserItem;