import React from 'react';
import Button from "../UI/Buttons/Button/Button";
import FlexRow from "../UI/Containers/FlexRow/FlexRow";

const TemplatesPage = () => {
    return (
        <div>
            <FlexRow jcr>
                <Button active>Привет</Button>
                <Button active>Привет</Button>
                <Button>Привет</Button>
                <Button>Привет</Button>
            </FlexRow>
        </div>
    );
};

export default TemplatesPage;