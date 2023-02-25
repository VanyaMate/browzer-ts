import React from 'react';
import css from './FlexRow.module.scss';

const FlexRow = (props: any) => {
    return (
        <div className={[
            css.flexRow,
            props.className || '',
            props.jcr ? css.flexRow_jcRight : '',
            props.jcl ? css.flexRow_jcLeft : '',
        ].join(' ')}>
            {props.children}
        </div>
    );
};

export default FlexRow;