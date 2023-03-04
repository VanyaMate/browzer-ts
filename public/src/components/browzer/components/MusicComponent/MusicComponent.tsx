import React from 'react';
import {IComponent} from "../../../../../../interfaces/block";

const MusicComponent = (props: { componentData: IComponent }) => {
    return (
        <div>
            MusicComponent
            <div>id: {props.componentData.id}</div>
        </div>
    );
};

export default MusicComponent;