import * as React from 'react';
import { TooltipDivided } from '../tooltipDivided/TooltipDivided';


const tooltips = ['Fill out an online application - you do not need to visit the bank',
  'Find out the bank\'s decision immediately after filling out the application',
  'Find out the bank\'s decision immediately after filling out the application'];

const tooltipsForRender = tooltips.map((element, index) =>
  (
    <TooltipDivided number={ index + 1 } content={ element } key={ index } />
  ));
export const HowToGetCardInfo: React.FC = () =>
  (
    <section className="get-info">
      <p className="get-info__title">How to get a card</p>
      <div className="get-info__toltips-container">
        { tooltipsForRender }
      </div>
    </section>
  );
