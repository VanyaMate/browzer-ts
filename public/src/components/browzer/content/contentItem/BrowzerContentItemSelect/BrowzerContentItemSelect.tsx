import React, {useMemo} from 'react';
import {IBlock, IComponent} from "../../../../../../../interfaces/block";
import Button from "../../../../UI/Buttons/Button/Button";
import css from './BrowzerContentItemSelect.module.scss';
import IconButton from "../../../../UI/Buttons/IconButton/IconButton";
import {useBrowzerBlocks} from "../../../../../hooks/useBrowzerBlocks";
import {ComponentType} from "../../../../../../../enums/blocks";

const BrowzerContentItemSelect = (props: { block: IBlock, index: number, active: string, setActive: (id: string) => void }) => {
    const blocks = useBrowzerBlocks();
    const [showedBlocks, hiddenBlocks] = useMemo(() => {
        const blocks = [[], []] as IComponent[][];

        for (let i = 0; i < props.block.components.length; i++) {
            blocks[i < 3 ? 0 : 1].push(props.block.components[i]);
        }

        return blocks;
    }, [props.block.components])

    return (
        <div className={css.container}>
            {
                showedBlocks.map((component) => {
                    return <Button
                        key={component.id}
                        onClick={() => props.setActive(component.id)}
                        active={props.active !== component.id}
                    >
                        {component.name}
                    </Button>
                })
            }
            <IconButton active onClick={() => {
                blocks.addComponent(props.index, 'Component', ComponentType.CONVERSATIONS)
            }}>+</IconButton>
            {
                props.block.components.length > 3 ? <IconButton>=</IconButton> : ''
            }
        </div>
    );
};

export default BrowzerContentItemSelect;