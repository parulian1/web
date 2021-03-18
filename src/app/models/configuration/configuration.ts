import { ExtraConfig } from '@app/models';
import { SocialMediaPage } from '@app/models/social-media';
import { IWebAnalyticConfigType } from '@app/shared/web-analytic/schemas';

export interface IConfigChatService {
  provider: string;
  widgetCode: string;
  isDefault?: string;
  href?: string;
}

export class Configuration {
  name: string;
  logo?: string;
  gaAccountId?: string;
  gaAccountType?: IWebAnalyticConfigType;
  favicon?: string;
  tagLine?: string;
  extraConfig?: ExtraConfig;
  socialMedias?: SocialMediaPage[];
  chatService?: IConfigChatService;
}
