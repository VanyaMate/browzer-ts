import React from 'react';
import {IMessage} from "../../../../../../../../../../interfaces/messages";
import css from './AnotherMessage.module.scss';
import {getStringDate} from "../../../../../../../../../../utils/helpers";

const AnotherMessage = (props: { message: IMessage }) => {
    return (
        <div className={[
                css.container,
                props.message.loading ? css.loading : '',
                props.message.error ? css.error : '',
            ].join(' ')}
        >
            <div className={css.info}>
                <div className={css.headerInfo}>
                    <div className={css.name}>
                        [ { props.message.from.name } ]
                    </div>
                    <div className={css.time}>
                        { getStringDate(props.message.creationTime) }
                    </div>
                    <div className={css.changed}>{ props.message.changed ? '(изм.)' : '' }</div>
                </div>
                <div className={css.message}>
                    { props.message.text }
                </div>
            </div>
        </div>
    );
};

export default AnotherMessage;