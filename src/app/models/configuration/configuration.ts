import { ExtraConfig } from "@app/models";

export class Configuration {
  name: string;
  logo?: string;
  gaAccountId?: string;
  favicon?: string;
  tagLine?: string;
  extraConfig?: ExtraConfig;
}
