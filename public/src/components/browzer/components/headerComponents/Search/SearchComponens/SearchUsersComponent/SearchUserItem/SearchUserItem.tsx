import React from 'react';
import {IPublicUserData} from "../../../../../../../../../../interfaces/users";
import css from './SearchUserItem.module.scss';
import Button from "../../../../../../../UI/Buttons/Button/Button";
import SmallIcon from "../../../../../../../UI/Icons/SmallIcon/SmallIcon";
import BigButton from "../../../../../../../UI/Buttons/BigButton/BigButton";

const SearchUserItem = (props: { user: IPublicUserData<string> }) => {
    return (
        <div className={css.container}>
            <div className={css.avatar}>
                <SmallIcon br src={props.user.avatar}/>
            </div>
            <div className={css.login}>{props.user.login}</div>
            <div className={css.control}>
                <BigButton
                    active
                    className={[css.message, css.button].join(' ')}
                >
                    <SmallIcon
                        src={'http://localhost:3000/assets/icons/messenger.png'}
                        className={[css.buttonIcon]}
                    />
                </BigButton>
                <BigButton
                    active
                    className={[css.addFriend, css.button].join(' ')}
                >
                    <SmallIcon
                        src={'http://localhost:3000/assets/icons/high-five.png'}
                        className={[css.buttonIcon]}
                    />
                </BigButton>
            </div>
        </div>
    );
};

export default SearchUserItem;