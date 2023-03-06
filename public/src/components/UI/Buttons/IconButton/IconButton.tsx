import React, {memo} from 'react';
import css from "./IconButton.module.scss";
import Button from "../Button/Button";

const IconButton = memo((props: any) => {
    return (
        <Button css={css} {...props}>{ props.children }</Button>
    );
});

export default IconButton;