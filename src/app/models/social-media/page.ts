import { SocialMediaPlatform } from '@app/models/social-media/platform.type';

export interface SocialMediaPage {
  type: SocialMediaPlatform;
  logo: string;
  url: string;
}
