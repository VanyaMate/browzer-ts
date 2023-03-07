import React from 'react';
import css from './NotifyContent.module.scss';

const NotifyContent = (props: { children: any, hide: boolean }) => {
    return (
        <div className={[css.container, props.hide ? css.hide : ''].join(' ')}>
            { props.children }
        </div>
    );
};

export default NotifyContent;