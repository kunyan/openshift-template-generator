type TemplateKind =
  | 'Template'
  | 'BuildConfig'
  | 'DeploymentConfig'
  | 'Service'
  | 'Route'
  | 'Secret'
  | 'ConfigMap';
type APIVersion = 'v1';
interface IConfigBase {
  apiVersion: APIVersion;
  kind: TemplateKind;
  metadata?: IMetaData;
}

interface IMetaData {
  annotations?: { [key: string]: string }[];
  labels?: { [key: string]: string }[];
  name: string;
}

export interface ITemplate extends IConfigBase {
  kind: 'Template';
  objects: Array<IBuildConfig | IDeploymentConfig>;
}
export interface IBuildConfig extends IConfigBase {
  spec: IBuildConfigSpec;
}

export interface IBuildConfigSpec {
  output: IOutput;
  postCommit?: {};
  resources?: {};
  runPolicy?: string;
  source: ISource;
  strategy?: {};
}

export interface IDeploymentConfig extends IConfigBase {
  spec: IDeploymentConfigSpec;
}

export interface IDeploymentConfigSpec {
  output?: {};
  postCommit?: {};
  resources?: {};
  runPolicy?: string;

  strategy?: {};
}

export interface IStrategy {
  from: {
    kind: string;
    name: string;
  };
  forcePull?: boolean;
  incremental?: boolean;
  scripts?: string;
}

export interface IDockerStrategy {
  from?: {
    kind: string;
    name: string;
  };
  dockerfilePath?: string;
  noCache?: boolean;
}

export interface ISource {
  type: string;
  git: IGit;
  contextDir?: string;
  dockerfile?: string;
  sourceSecret?: { name: string };
}

export interface IOutput {
  pushSecret: {
    name: string;
  };
  to: {
    kind: string;
    name: string;
  };
}

export interface IGit {
  uri: string;
  ref: string;
  httpProxy?: string;
  httpsProxy?: string;
}
