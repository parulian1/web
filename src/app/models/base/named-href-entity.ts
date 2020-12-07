import { HrefEntity } from './href-entity';

/**
 * Standard convention for links to related resources, returned from our API.
 */
export interface NamedHrefEntity extends HrefEntity {
  name: string;
}
