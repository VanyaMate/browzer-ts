import React, {useState} from 'react';
import css from './NoComponentsContent.module.scss';
import ComponentSelector from "../../UI/ComponentSelector";
import Button from "../../../UI/Buttons/Button/Button";
import IconButton from "../../../UI/Buttons/IconButton/IconButton";

const NoComponentsContent = (props: { index: number }) => {
    const [hideSelector, setHideSelector] = useState(true);

    return (
        <div className={css.container}>
            <div className={css.relative}>
                <IconButton
                    active
                    onClick={() => {
                        setHideSelector(prev => !prev);
                    }}
                >+</IconButton>

                <ComponentSelector hide={hideSelector} index={props.index}/>
            </div>
        </div>
    );
};

export default NoComponentsContent;