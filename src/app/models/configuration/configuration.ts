import { ConfigurationLine } from "@app/models/configuration/configuration-line";

export class Configuration {
  name: string;
  logo?: string;
  gaAccountId?: string;
  favicon?: string;
  extraConfig?: ConfigurationLine[];
}
