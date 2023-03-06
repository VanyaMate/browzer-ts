import React from 'react';
import BigButton from "../../../../../../UI/Buttons/BigButton/BigButton";
import css from "./ConversationControl.module.scss";
import SmallIcon from "../../../../../../UI/Icons/SmallIcon/SmallIcon";

const ConversationControl = (props: { open: boolean, setOpen: (v: any) => void }) => {
    return (
        <div className={css.container}>
            <BigButton
                className={css.button}
                active
                always={props.open}
                onClick={() => {
                    props.setOpen((prev: boolean) => !prev);
                }}
                style={{marginBottom: 5}}
            >
                <SmallIcon
                    src={'http://localhost:3000/assets/icons/right-arrow.png'}
                    className={[css.icon, css.iconRotate, props.open ? css.active : '']}
                />
            </BigButton>
            <BigButton
                className={css.button}
            >
                <SmallIcon
                    src={'http://localhost:3000/assets/icons/clipboard.png'}
                    className={[css.icon]}
                />
            </BigButton>
            <BigButton
                className={css.button}
            >
                <SmallIcon
                    src={'http://localhost:3000/assets/icons/inbox.png'}
                    className={[css.icon]}
                />
            </BigButton>
        </div>
    );
};

export default ConversationControl;