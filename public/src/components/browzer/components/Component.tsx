import React from 'react';

const Component = (props: { active: boolean, children: any })=> {
    return (
        <div style={{
            height: 'calc(100% - 35px)',
            display: props.active ? 'block' : 'none'
        }}>
            { props.children }
        </div>
    );
};

export default Component;