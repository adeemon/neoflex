import * as React from 'react'
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured'
import globalMap from '../../assets/images/content/Huge Global.svg';

export const GlobalMap: React.FC = () => {
    return (
        <section className="map">
            <h2 className="map__title">You can use our services anywhere in the world</h2>
            <p className="map__description">Withdraw and transfer money online through our application</p>
            <ImageFigured className='map__image-container' src={globalMap} />
        </section>
    )
}