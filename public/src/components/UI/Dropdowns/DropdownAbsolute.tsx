import React, {memo, useState} from 'react';
import css from './DropdownAbsolute.module.scss';

const DropdownAbsolute = memo((props: { hide: boolean, children: any, style: any, className?: string[] }) => {
    const { hide, className, ...other } = props;

    return (
        <div className={ [
            css.container,
            hide ? css.hidden : '',
            className ? className : ''
        ].flat().join(' ') }
             {...other}
        >
            { props.children }
        </div>
    );
});

export default DropdownAbsolute;