import React from 'react';
import {IComponent} from "../../../../../../interfaces/block";
import TextArea from "../../../UI/Inputs/Textarea/TextArea";
import {useInputValue} from "../../../../hooks/useInputValue";

const IFrameComponent = (props: { componentData: IComponent }) => {
    const textarea = useInputValue('');

    return (
        <div>
            IFrameComponent
            <div>id: {props.componentData.id}</div>
            <TextArea
                hook={textarea}
                onSubmit={() => {
                    console.log(textarea.value);
                    textarea.setValue('');
                }}
            />
        </div>
    );
};

export default IFrameComponent;