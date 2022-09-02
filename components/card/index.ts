import { CardDescription } from './CardDescription';
import { CardMain } from './CardMain';
import { CardTitle } from './CardTitle';

const Card = Object.assign(CardMain, {
  Title: CardTitle,
  Description: CardDescription,
});

export default Card;
