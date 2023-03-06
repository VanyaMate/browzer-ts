import React from 'react';
import css from './Component.module.scss';

const Component = (props: { active: boolean, children: any })=> {
    return (
        <div className={[css.container, props.active ? css.active : ''].join(' ')}>
            { props.children }
        </div>
    );
};

export default Component;