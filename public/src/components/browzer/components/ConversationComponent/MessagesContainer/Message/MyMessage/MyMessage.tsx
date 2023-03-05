import React from 'react';
import {IMessage} from "../../../../../../../../../interfaces/messages";
import css from './MyMessage.module.scss';
import {getStringDate} from "../../../../../../../../../utils/helpers";
import ClickInput from "../../../../../../UI/Inputs/ClickInput/ClickInput";
import ClickTextarea from "../../../../../../UI/Inputs/ClickTextarea/ClickTextarea";

const MyMessage = (props: { message: IMessage }) => {
    return (
        <div className={[
                css.container,
                props.message.loading ? css.loading : '',
                props.message.error ? css.error : '',
            ].join(' ')}
        >
            <div className={css.info}>
                <div className={css.headerInfo}>
                    <div className={css.changed}></div>
                    <div className={css.time}>
                        { getStringDate(props.message.creationTime) }
                    </div>
                    <div className={css.name}>
                        [ { props.message.from.name } ]
                    </div>
                </div>
                <div className={css.message}>
                    <ClickTextarea
                        value={props.message.text}
                        className={[css.input]}
                        validator={(v: string) => v.length !== 0}
                        successHandler={(e) => {
                            console.log(e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyMessage;