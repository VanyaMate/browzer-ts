import React, {memo} from 'react';
import Input from "../../../UI/Inputs/Input";
import {useInputValue} from "../../../../hooks/useInputValue";
import {IComponent} from "../../../../../../interfaces/block";
import BigButton from "../../../UI/Buttons/BigButton/BigButton";

const Conversations = (props: { active: string, componentData: IComponent }) => {
    const string = useInputValue('');

    return (
        <div style={props.active === props.componentData.id?{}:{display: 'none'}}>
            Conversations { props.componentData.id }
            <Input hook={string}/>
            {
                <BigButton>Привет</BigButton>
            }
        </div>
    );
};

export default Conversations;