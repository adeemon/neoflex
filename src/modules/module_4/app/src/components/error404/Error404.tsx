import * as React from 'react';
import { Link } from 'react-router-dom';
import errorMessage from '../../assets/images/design/404.png';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';


export const Error404: React.FC = () =>
  (
    <section className="error404">
      <div className="error404__wrapper">
        <div className="error404__info">
          <p className="error404__emotion">Oops....</p>
          <p className="error404__title">Page not found</p>
          <p className="error404__error-desc">
            This Page doesn`t exist or was removed! We suggest you go back.
          </p>
          <Link to="/">
            <ButtonMain label="Go back" className="error404__button" />
          </Link>
        </div>
        <ImageFigured src={ errorMessage } alt="404 error" />
      </div>
    </section>
  );
