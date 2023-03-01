import React, {useEffect} from 'react';
import css from './BrowzerContent.module.scss';
import {useMySelector} from "../../../hooks/redux";
import BrowzerContentItem from "./contentItem/BrowzerContentItem";

const BrowzerContent = () => {
    const blocks = useMySelector((state) => state.blocks);

    return (
        <div className={css.container}>
            {
                blocks.blocks.map((block, index) => {
                    return <BrowzerContentItem key={index} index={index} block={block}/>
                })
            }
        </div>
    );
};

export default BrowzerContent;