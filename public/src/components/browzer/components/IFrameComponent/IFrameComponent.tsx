import React from 'react';
import {IComponent} from "../../../../../../interfaces/block";

const IFrameComponent = (props: { componentData: IComponent }) => {
    return (
        <div>
            IFrameComponent
            <div>id: {props.componentData.id}</div>
        </div>
    );
};

export default IFrameComponent;