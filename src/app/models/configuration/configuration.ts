import { ConfigurationLine } from "@app/models/configuration/configuration-line";

export class Configuration {
  name: string;
  logo?: string;
  gaAccountId?: string;
  extraConfig?: ConfigurationLine[];
}
