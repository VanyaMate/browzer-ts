import React, {memo} from 'react';
import css from './BigButton.module.scss';
import Button from "../Button/Button";

const BigButton = memo((props: any) => {
    return (
        <Button css={css} {...props}>{ props.children }</Button>
    );
});

export default BigButton;