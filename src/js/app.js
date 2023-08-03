import { testParseSomeCurrAtOnce } from '../modules/Module_2/js/api';
import { subscribeOnExchange } from '../modules/Module_2/js/features/exchangeCurrency';
import { newsHandler } from '../modules/Module_2/js/features/news';
import '../styles/app.scss';
/* Your JS Code goes here */
subscribeOnExchange();
testParseSomeCurrAtOnce();
/* Demo JS */

newsHandler(100);