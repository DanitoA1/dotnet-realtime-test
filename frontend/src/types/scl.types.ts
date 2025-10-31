export interface SclDocument {
  header?: Header;
  communication?: Communication;
  ieds: IED[];
  dataTypeTemplates?: DataTypeTemplates;
}

export interface Header {
  toolID: string;
  revision: string;
  version: string;
  id: string;
}

export interface Communication {
  subNetworks: SubNetwork[];
}

export interface SubNetwork {
  name: string;
  connectedAPs: ConnectedAP[];
}

export interface ConnectedAP {
  apName: string;
  iedName: string;
  address?: Address;
}

export interface Address {
  parameters: P[];
}

export interface P {
  type: string;
  value: string;
}

export interface IED {
  name: string;
  manufacturer: string;
  configVersion: string;
  services?: Services;
  accessPoints: AccessPoint[];
}

export interface Services {
  dynAssociation?: any;
  goose?: ServiceWithMax;
  getDirectory?: any;
  getDataObjectDefinition?: any;
  dataObjectDirectory?: any;
  getDataSetValue?: any;
  setDataSetValue?: any;
  dataSetDirectory?: any;
  confDataSet?: ConfDataSet;
  dynDataSet?: DynDataSet;
  readWrite?: any;
  confReportControl?: ServiceWithMax;
  getCBValues?: any;
  reportSettings?: ReportSettings;
  gseSettings?: any;
  gseDir?: any;
  fileHandling?: any;
}

export interface ServiceWithMax {
  max: number;
}

export interface ConfDataSet {
  maxAttributes: number;
  max: number;
}

export interface DynDataSet {
  max: number;
  maxAttributes: number;
}

export interface ReportSettings {
  rptID: string;
  trgOps: string;
  intgPd: string;
  optFields: string;
  datSet: string;
  bufTime: string;
}

export interface AccessPoint {
  name: string;
  server?: Server;
}

export interface Server {
  authentication?: any;
  lDevices: LDevice[];
}

export interface LDevice {
  description: string;
  instance: string;
  ln0?: LN0;
  logicalNodes: LN[];
}

export interface LN0 {
  lnType: string;
  lnClass: string;
  instance: string;
  dataSets: DataSet[];
  reportControls: ReportControl[];
  dataObjectInstances: DOI[];
}

export interface LN {
  lnType: string;
  lnClass: string;
  instance: string;
  description: string;
  prefix: string;
  dataObjectInstances: DOI[];
}

export interface DataSet {
  name: string;
  fcdas: FCDA[];
}

export interface FCDA {
  ldInst: string;
  lnClass: string;
  lnInst: string;
  doName: string;
  daName: string;
  fc: string;
  prefix: string;
}

export interface ReportControl {
  name: string;
  datSet: string;
  rptID: string;
  confRev: string;
  buffered: boolean;
  bufTime: string;
  intgPd: string;
  trgOps?: TrgOps;
  optFields?: OptFields;
  rptEnabled?: RptEnabled;
}

export interface TrgOps {
  dchg: boolean;
  qchg: boolean;
  dupd: boolean;
  period: boolean;
  gi: boolean;
}

export interface OptFields {
  seqNum: boolean;
  timeStamp: boolean;
  dataSet: boolean;
  reasonCode: boolean;
  dataRef: boolean;
  entryID: boolean;
  configRef: boolean;
  bufOvfl: boolean;
}

export interface RptEnabled {
  max: number;
  clientLNs: ClientLN[];
}

export interface ClientLN {
  iedName: string;
  apRef: string;
  ldInst: string;
  lnClass: string;
  lnInst: string;
}

export interface DOI {
  name: string;
  dataAttributeInstances: DAI[];
  subDataInstances: SDI[];
}

export interface DAI {
  name: string;
  valKind: string;
  values: string[];
}

export interface SDI {
  name: string;
  dataAttributeInstances: DAI[];
}

export interface DataTypeTemplates {
  lNodeTypes: LNodeType[];
  doTypes: DOType[];
  daTypes: DAType[];
  enumTypes: EnumType[];
}

export interface LNodeType {
  id: string;
  lnClass: string;
  dataObjects: DO[];
}

export interface DO {
  name: string;
  type: string;
}

export interface DOType {
  id: string;
  cdc: string;
  dataAttributes: DA[];
  subDataObjects: SDO[];
}

export interface DA {
  name: string;
  bType: string;
  fc: string;
  type: string;
  dchg: boolean;
  qchg: boolean;
  dupd: boolean;
  val?: string;
}

export interface SDO {
  name: string;
  type: string;
}

export interface DAType {
  id: string;
  basicDataAttributes: BDA[];
}

export interface BDA {
  name: string;
  bType: string;
  type: string;
}

export interface EnumType {
  id: string;
  enumValues: EnumVal[];
}

export interface EnumVal {
  ord: number;
  value: string;
}

// API Response Types
export interface SclSummary {
  toolID: string;
  version: string;
  totalIEDs: number;
  totalLogicalDevices: number;
  totalLogicalNodes: number;
  totalDataSets: number;
  totalLNodeTypes: number;
  totalDOTypes: number;
  totalDATypes: number;
}

export interface IedInfo {
  name: string;
  manufacturer: string;
  configVersion: string;
  ipAddress: string;
  logicalDeviceCount: number;
}

export interface CommunicationInfo {
  subNetworks: SubNetworkInfo[];
}

export interface SubNetworkInfo {
  name: string;
  connectedDevices: ConnectedDeviceInfo[];
}

export interface ConnectedDeviceInfo {
  iedName: string;
  accessPointName: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
}
