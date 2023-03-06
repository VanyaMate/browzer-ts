import React from 'react';
import {IComponent} from "../../../../../../../interfaces/block";

const SettingsComponent = (props: { componentData: IComponent }) => {
    return (
        <div>
            SettingsComponent
            <div>id: {props.componentData.id}</div>
        </div>
    );
};

export default SettingsComponent;