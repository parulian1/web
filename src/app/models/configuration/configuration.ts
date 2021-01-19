import { ExtraConfig } from "@app/models";
import {SocialMediaPage} from "@app/models/social-media";

export class Configuration {
  name: string;
  logo?: string;
  gaAccountId?: string;
  favicon?: string;
  tagLine?: string;
  extraConfig?: ExtraConfig;
  socialMedias?: SocialMediaPage[];
}
