import React, {useState} from 'react';
import css from './Vertical.module.scss';

const Vertical = (props: any) => {
    const scrollHandler = function (e: React.UIEvent<HTMLDivElement, UIEvent>) {
        const scrollHeight = e.currentTarget.scrollHeight;
        const scrollTop = e.currentTarget.scrollTop;
        const scrollClient = e.currentTarget.clientHeight;

        props.scrollHandler && props.scrollHandler([
            scrollHeight - scrollClient - scrollTop,
            100 / scrollHeight * (scrollClient + scrollTop)
        ]);
    }

    return (
        <div
            className={[
                css.container,
                props.className || '',
                props.type === 'bottom' ? css.bottom : css.top
            ].flat().join(' ')}
            style={props.style}
            onScroll={scrollHandler}
        >
            {props.children}
        </div>
    );
};

export default Vertical;