import React from 'react';
import BigButton from "../../../../../UI/Buttons/BigButton/BigButton";
import css from "./ConversationControl.module.scss";

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
                {"<-"}
            </BigButton>
            <BigButton
                className={css.button}
            >
                {"+"}
            </BigButton>
            <BigButton
                className={css.button}
            >
                {"="}
            </BigButton>
        </div>
    );
};

export default ConversationControl;