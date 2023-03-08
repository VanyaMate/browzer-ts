import React, {useState} from 'react';

const ScrollContainer = (props: { onScroll: (x: number, y: number) => void, children: any }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return (
        <div onScroll={(e) => {
            console.log(e)
        }}>
            { props.children }
        </div>
    );
};

export default ScrollContainer;