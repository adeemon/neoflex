import * as React from 'react';
import developerImg from '../../assets/images/content/Illustration 2.png';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';

export const Features: React.FC = () => {
    return (
        <section className="features">
            <ImageFigured className='features__figure' src={developerImg} alt='Developer' />
            <h2 className="features__title">
                We Provide Many Features You Can Use
            </h2>
            <p className="features__list-description">
                You can explore the features that we provide with fun and have their own functions each feature
            </p>
            <ul className="features__features-list">
                <li className="features__feature">
                    <span className="features__feature-content">
                      Powerfull online protection.
                    </span>
                </li>
                <li className="features__feature">
                    <span className="features__feature-content">
                    Cashback without borders.
                  </span>

                </li>
                <li className="features__feature">
                    <span className="features__feature-content">
                    Personal design
                  </span>
                </li>
                <li className="features__feature">
                    <span className="features__feature-content">
                    Work anywhere in the world
                  </span>
                </li>
            </ul>
        </section>
    )
}