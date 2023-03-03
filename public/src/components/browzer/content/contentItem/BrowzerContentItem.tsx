import React, {useState} from 'react';
import css from './BrowzerContentItem.module.scss';
import {IBlock} from "../../../../../../interfaces/block";
import BrowzerContentItemsList from '../../../../common/BrowzerContentItemsList';
import BrowzerContentItemSelect from "./BrowzerContentItemSelect/BrowzerContentItemSelect";
import ComponentSelector from "../../UI/ComponentSelector";
import NoComponentsContent from "../../components/noComponents/NoComponentsContent";


const BrowzerContentItem = (props: { block: IBlock, index: number }) => {
    const [active, setActive] = useState(props.block.components.find((c) => c.id === props.block.active)?.id || props.block.components[0]?.id)

    return (
        <div className={[css.container, props.block.components.length ? css.noBorder : ''].join(' ')}>
            {
                props.block.components.length ?
                    <>
                        <BrowzerContentItemSelect block={props.block} index={props.index} active={active} setActive={setActive}/>
                        {
                            props.block.components.map((componentData) => {
                                const Component = BrowzerContentItemsList[componentData.type].Component;
                                return <Component key={componentData.id} active={active} componentData={componentData}/>
                            })
                        }
                    </> :
                    <NoComponentsContent index={props.index}/>
            }
        </div>
    );
};

export default BrowzerContentItem;