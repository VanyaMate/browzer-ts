import React from 'react';

const Component = (props: { active: boolean, children: any })=> {
    return (
        <div style={props.active ? {} : {display: 'none'}}>
            { props.children }
        </div>
    );
};

export default Component;