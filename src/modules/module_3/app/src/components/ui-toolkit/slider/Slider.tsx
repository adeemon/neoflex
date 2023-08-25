import * as React from 'react';
import {ReactComponent as Pimp} from '../../../assets/images/design/sliderPimp.svg'
export interface ISliderProps {
    min: number,
    max: number,
    current: number
}

export const Slider: React.FC<ISliderProps> = ({min, max, current}) => {
    React.useEffect(()=> {
        console.log(currentPosition);
    })
    const currentPosition = ((current - min)/(max - min))*100;
    
    return (
        <div className="slider">
            <div className="slider__wrapper">
                <div className="slider__complete" style={
                    {width: `${currentPosition}%`}}>

                </div>
                <Pimp />
                <div className="slider__uncomplete" style={
                    {width: `${100 - currentPosition}%`}}>
                </div>
            </div>
            <div className="slider__values">
                <p className="slider__value">
                    {min}
                </p>
                <p className="slider__value">
                    {max}
                </p>
            </div>
        </div>
    )
}
