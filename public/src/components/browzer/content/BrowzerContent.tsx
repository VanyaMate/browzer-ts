import React from 'react';
import BrowzerContentItem from "./contentItem/BrowzerContentItem";
import css from './BrowzerContent.module.scss';
import {useMySelector} from "../../../hooks/redux";

const BrowzerContent = () => {
    const friends = useMySelector((state) => state.friends);
    const conversations = useMySelector((state) => state.conversations);
    const notifications = useMySelector((state) => state.notifications);

    return (
        <div className={css.container}>
            <BrowzerContentItem>
                <div>[ BrowzerContentItem #1 - Friends ]</div>
                <div>
                    <div>[Friends]</div>
                    {
                        friends.friends.map((friend) => {
                            return <div key={friend.login}>{friend.login}</div>;
                        })
                    }
                    <div>[Requests-In]</div>
                    {
                        friends.requestsIn.map((friend) => {
                            return <div key={friend.login}>{friend.login}</div>;
                        })
                    }
                    <div>[Requests-Out]</div>
                    {
                        friends.requestsOut.map((friend) => {
                            return <div key={friend.login}>{friend.login}</div>;
                        })
                    }
                </div>
            </BrowzerContentItem>
            <BrowzerContentItem>
                <div>[ BrowzerContentItem #2 - Conversations ]</div>
                {
                    conversations.list.map((conversation) => {
                        return <div key={conversation.id}>{conversation.id} | {conversation.messages.length}</div>;
                    })
                }
            </BrowzerContentItem>
            <BrowzerContentItem>
                <div>[ BrowzerContentItem #3 - Notifications ]</div>
                {
                    notifications.list.map((notification) => {
                        return <div style={{marginTop: 10}} key={notification.id}>
                            <div>id: {notification.id}</div>
                            <div>type: {notification.type}</div>
                            <div>title: {notification.data.title}</div>
                            <div>message: {notification.data.message}</div>
                            <div>creationTime: {notification.creationTime}</div>
                        </div>
                    }).reverse()
                }
            </BrowzerContentItem>
        </div>
    );
};

export default BrowzerContent;