import React from 'react';
import css from './MedTitle.module.scss';

const MedTitle = (props: any) => {
    return (
        <div className={css.title}>
            { props.children }
        </div>
    );
};

export default MedTitle;