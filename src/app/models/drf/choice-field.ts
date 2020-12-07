import { Field } from './field';
import { Choice } from './choice';

export interface ChoiceField extends Field {
  choices: Array<Choice>;
}
