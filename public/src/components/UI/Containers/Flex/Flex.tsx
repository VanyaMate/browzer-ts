import React from 'react';
import css from './Flex.module.scss';

export interface IFlexProps {
    className?: string,
    jcr?: boolean,
    jcl?: boolean,
    dr?: boolean,
    dc?: boolean,
    ps?: boolean,
    pm?: boolean,
    pb?: boolean,
    ms?: boolean,
    mm?: boolean,
    mb?: boolean,
    cmhs?: boolean,
    cmhm?: boolean,
    cmvs?: boolean,
    cmvm?: boolean,
    style?: any,
    children?: any
}

const Flex = (props: IFlexProps) => {
    return (
        <div
            className={[
                css.flexRow,
                props.className || '',
                props.jcr ? css.flexRow_jcRight : '',
                props.jcl ? css.flexRow_jcLeft : '',
                props.dr ? css.flexRow_dr : '',
                props.dc ? css.flexRow_dc : '',
                props.ps ? css.flexRow_ps : '',
                props.pm ? css.flexRow_pm : '',
                props.pb ? css.flexRow_pb : '',
                props.ms ? css.flexRow_ms : '',
                props.mm ? css.flexRow_mm : '',
                props.mb ? css.flexRow_mb : '',
                props.cmhs ? css.flexRow_cmhs : '',
                props.cmhm ? css.flexRow_cmhm : '',
                props.cmvs ? css.flexRow_cmvs : '',
                props.cmvm ? css.flexRow_cmvm : '',
            ].join(' ')}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

export default Flex;