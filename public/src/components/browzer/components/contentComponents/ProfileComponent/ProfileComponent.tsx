import React from 'react';
import {IComponent} from "../../../../../../../interfaces/block";

const ProfileComponent = (props: { componentData: IComponent }) => {
    return (
        <div>
            ProfileComponent
            <div>id: {props.componentData.id}</div>
        </div>
    );
};

export default ProfileComponent;