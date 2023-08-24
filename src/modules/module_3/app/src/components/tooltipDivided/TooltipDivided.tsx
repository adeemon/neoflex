import * as React from 'react';

export interface ITooltipDividerProps {
    number: number,
    content: string
}

export const TooltipDivided: React.FC<ITooltipDividerProps> = ({number, content}) => {
    return (
        <div className="tolltip-divided">
            <p className="tolltip-divided__number">{number}</p>
            <div className="tolltip-divided__divider">
                <div className='tolltip-divided__divider-assist'>
                    {''}
                </div>
                <div className='tolltip-divided__divider-assist'>
                    {''}
                </div>
            </div>
            <p className="tolltip-divided__content">{content}</p>
        </div>
    )
}