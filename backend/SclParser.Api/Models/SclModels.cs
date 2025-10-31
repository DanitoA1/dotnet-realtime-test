using System.Xml.Serialization;
using System.Text.Json.Serialization;

namespace SclParser.Api.Models;

[XmlRoot("SCL", Namespace = "http://www.iec.ch/61850/2003/SCL")]
public class SclDocument
{
    [XmlElement("Header")]
    [JsonPropertyName("header")]
    public Header? Header { get; set; }

    [XmlElement("Communication")]
    [JsonPropertyName("communication")]
    public Communication? Communication { get; set; }

    [XmlElement("IED")]
    [JsonPropertyName("ieds")]
    public List<IED> IEDs { get; set; } = new();

    [XmlElement("DataTypeTemplates")]
    [JsonPropertyName("dataTypeTemplates")]
    public DataTypeTemplates? DataTypeTemplates { get; set; }
}

public class Header
{
    [XmlAttribute("toolID")]
    public string ToolID { get; set; } = string.Empty;

    [XmlAttribute("revision")]
    public string Revision { get; set; } = string.Empty;

    [XmlAttribute("version")]
    public string Version { get; set; } = string.Empty;

    [XmlAttribute("id")]
    public string Id { get; set; } = string.Empty;
}

public class Communication
{
    [XmlElement("SubNetwork")]
    public List<SubNetwork> SubNetworks { get; set; } = new();
}

public class SubNetwork
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("ConnectedAP")]
    public List<ConnectedAP> ConnectedAPs { get; set; } = new();
}

public class ConnectedAP
{
    [XmlAttribute("apName")]
    public string ApName { get; set; } = string.Empty;

    [XmlAttribute("iedName")]
    public string IedName { get; set; } = string.Empty;

    [XmlElement("Address")]
    public Address? Address { get; set; }
}

public class Address
{
    [XmlElement("P")]
    public List<P> Parameters { get; set; } = new();
}

public class P
{
    [XmlAttribute("type")]
    public string Type { get; set; } = string.Empty;

    [XmlText]
    public string Value { get; set; } = string.Empty;
}

public class IED
{
    [XmlAttribute("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("manufacturer")]
    [JsonPropertyName("manufacturer")]
    public string Manufacturer { get; set; } = string.Empty;

    [XmlAttribute("configVersion")]
    [JsonPropertyName("configVersion")]
    public string ConfigVersion { get; set; } = string.Empty;

    [XmlElement("Services")]
    [JsonPropertyName("services")]
    public Services? Services { get; set; }

    [XmlElement("AccessPoint")]
    [JsonPropertyName("accessPoints")]
    public List<AccessPoint> AccessPoints { get; set; } = new();
}

public class Services
{
    [XmlElement("DynAssociation")]
    public object? DynAssociation { get; set; }

    [XmlElement("GOOSE")]
    public ServiceWithMax? GOOSE { get; set; }

    [XmlElement("GetDirectory")]
    public object? GetDirectory { get; set; }

    [XmlElement("GetDataObjectDefinition")]
    public object? GetDataObjectDefinition { get; set; }

    [XmlElement("DataObjectDirectory")]
    public object? DataObjectDirectory { get; set; }

    [XmlElement("GetDataSetValue")]
    public object? GetDataSetValue { get; set; }

    [XmlElement("SetDataSetValue")]
    public object? SetDataSetValue { get; set; }

    [XmlElement("DataSetDirectory")]
    public object? DataSetDirectory { get; set; }

    [XmlElement("ConfDataSet")]
    public ConfDataSet? ConfDataSet { get; set; }

    [XmlElement("DynDataSet")]
    public DynDataSet? DynDataSet { get; set; }

    [XmlElement("ReadWrite")]
    public object? ReadWrite { get; set; }

    [XmlElement("ConfReportControl")]
    public ServiceWithMax? ConfReportControl { get; set; }

    [XmlElement("GetCBValues")]
    public object? GetCBValues { get; set; }

    [XmlElement("ReportSettings")]
    public ReportSettings? ReportSettings { get; set; }

    [XmlElement("GSESettings")]
    public object? GSESettings { get; set; }

    [XmlElement("GSEDir")]
    public object? GSEDir { get; set; }

    [XmlElement("FileHandling")]
    public object? FileHandling { get; set; }
}

public class ServiceWithMax
{
    [XmlAttribute("max")]
    public int Max { get; set; }
}

public class ConfDataSet
{
    [XmlAttribute("maxAttributes")]
    public int MaxAttributes { get; set; }

    [XmlAttribute("max")]
    public int Max { get; set; }
}

public class DynDataSet
{
    [XmlAttribute("max")]
    public int Max { get; set; }

    [XmlAttribute("maxAttributes")]
    public int MaxAttributes { get; set; }
}

public class ReportSettings
{
    [XmlAttribute("rptID")]
    public string RptID { get; set; } = string.Empty;

    [XmlAttribute("trgOps")]
    public string TrgOps { get; set; } = string.Empty;

    [XmlAttribute("intgPd")]
    public string IntgPd { get; set; } = string.Empty;

    [XmlAttribute("optFields")]
    public string OptFields { get; set; } = string.Empty;

    [XmlAttribute("datSet")]
    public string DatSet { get; set; } = string.Empty;

    [XmlAttribute("bufTime")]
    public string BufTime { get; set; } = string.Empty;
}

public class AccessPoint
{
    [XmlAttribute("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("Server")]
    [JsonPropertyName("server")]
    public Server? Server { get; set; }
}

public class Server
{
    [XmlElement("Authentication")]
    [JsonPropertyName("authentication")]
    public object? Authentication { get; set; }

    [XmlElement("LDevice")]
    [JsonPropertyName("lDevices")]
    public List<LDevice> LDevices { get; set; } = new();
}

public class LDevice
{
    [XmlAttribute("desc")]
    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [XmlAttribute("inst")]
    [JsonPropertyName("instance")]
    public string Instance { get; set; } = string.Empty;

    [XmlElement("LN0")]
    [JsonPropertyName("ln0")]
    public LN0? LN0 { get; set; }

    [XmlElement("LN")]
    [JsonPropertyName("logicalNodes")]
    public List<LN> LogicalNodes { get; set; } = new();
}

public class LN0
{
    [XmlAttribute("lnType")]
    [JsonPropertyName("lnType")]
    public string LnType { get; set; } = string.Empty;

    [XmlAttribute("lnClass")]
    [JsonPropertyName("lnClass")]
    public string LnClass { get; set; } = string.Empty;

    [XmlAttribute("inst")]
    [JsonPropertyName("instance")]
    public string Instance { get; set; } = string.Empty;

    [XmlElement("DataSet")]
    [JsonPropertyName("dataSets")]
    public List<DataSet> DataSets { get; set; } = new();

    [XmlElement("ReportControl")]
    [JsonPropertyName("reportControls")]
    public List<ReportControl> ReportControls { get; set; } = new();

    [XmlElement("DOI")]
    [JsonPropertyName("dataObjectInstances")]
    public List<DOI> DataObjectInstances { get; set; } = new();
}

public class LN
{
    [XmlAttribute("lnType")]
    public string LnType { get; set; } = string.Empty;

    [XmlAttribute("lnClass")]
    public string LnClass { get; set; } = string.Empty;

    [XmlAttribute("inst")]
    public string Instance { get; set; } = string.Empty;

    [XmlAttribute("desc")]
    public string Description { get; set; } = string.Empty;

    [XmlAttribute("prefix")]
    public string Prefix { get; set; } = string.Empty;

    [XmlElement("DOI")]
    public List<DOI> DataObjectInstances { get; set; } = new();
}

public class DataSet
{
    [XmlAttribute("name")]
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("FCDA")]
    [JsonPropertyName("fcdas")]
    public List<FCDA> FCDAs { get; set; } = new();
}

public class FCDA
{
    [XmlAttribute("ldInst")]
    [JsonPropertyName("ldInst")]
    public string LdInst { get; set; } = string.Empty;

    [XmlAttribute("lnClass")]
    [JsonPropertyName("lnClass")]
    public string LnClass { get; set; } = string.Empty;

    [XmlAttribute("lnInst")]
    [JsonPropertyName("lnInst")]
    public string LnInst { get; set; } = string.Empty;

    [XmlAttribute("doName")]
    [JsonPropertyName("doName")]
    public string DoName { get; set; } = string.Empty;

    [XmlAttribute("daName")]
    [JsonPropertyName("daName")]
    public string DaName { get; set; } = string.Empty;

    [XmlAttribute("fc")]
    [JsonPropertyName("fc")]
    public string Fc { get; set; } = string.Empty;

    [XmlAttribute("prefix")]
    [JsonPropertyName("prefix")]
    public string Prefix { get; set; } = string.Empty;
}

public class ReportControl
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("datSet")]
    public string DatSet { get; set; } = string.Empty;

    [XmlAttribute("rptID")]
    public string RptID { get; set; } = string.Empty;

    [XmlAttribute("confRev")]
    public string ConfRev { get; set; } = string.Empty;

    [XmlAttribute("buffered")]
    public bool Buffered { get; set; }

    [XmlAttribute("bufTime")]
    public string BufTime { get; set; } = string.Empty;

    [XmlAttribute("intgPd")]
    public string IntgPd { get; set; } = string.Empty;

    [XmlElement("TrgOps")]
    public TrgOps? TrgOps { get; set; }

    [XmlElement("OptFields")]
    public OptFields? OptFields { get; set; }

    [XmlElement("RptEnabled")]
    public RptEnabled? RptEnabled { get; set; }
}

public class TrgOps
{
    [XmlAttribute("dchg")]
    public bool Dchg { get; set; }

    [XmlAttribute("qchg")]
    public bool Qchg { get; set; }

    [XmlAttribute("dupd")]
    public bool Dupd { get; set; }

    [XmlAttribute("period")]
    public bool Period { get; set; }

    [XmlAttribute("gi")]
    public bool Gi { get; set; }
}

public class OptFields
{
    [XmlAttribute("seqNum")]
    public bool SeqNum { get; set; }

    [XmlAttribute("timeStamp")]
    public bool TimeStamp { get; set; }

    [XmlAttribute("dataSet")]
    public bool DataSet { get; set; }

    [XmlAttribute("reasonCode")]
    public bool ReasonCode { get; set; }

    [XmlAttribute("dataRef")]
    public bool DataRef { get; set; }

    [XmlAttribute("entryID")]
    public bool EntryID { get; set; }

    [XmlAttribute("configRef")]
    public bool ConfigRef { get; set; }

    [XmlAttribute("bufOvfl")]
    public bool BufOvfl { get; set; }
}

public class RptEnabled
{
    [XmlAttribute("max")]
    public int Max { get; set; }

    [XmlElement("ClientLN")]
    public List<ClientLN> ClientLNs { get; set; } = new();
}

public class ClientLN
{
    [XmlAttribute("iedName")]
    public string IedName { get; set; } = string.Empty;

    [XmlAttribute("apRef")]
    public string ApRef { get; set; } = string.Empty;

    [XmlAttribute("ldInst")]
    public string LdInst { get; set; } = string.Empty;

    [XmlAttribute("lnClass")]
    public string LnClass { get; set; } = string.Empty;

    [XmlAttribute("lnInst")]
    public string LnInst { get; set; } = string.Empty;
}

public class DOI
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("DAI")]
    public List<DAI> DataAttributeInstances { get; set; } = new();

    [XmlElement("SDI")]
    public List<SDI> SubDataInstances { get; set; } = new();
}

public class DAI
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("valKind")]
    public string ValKind { get; set; } = string.Empty;

    [XmlElement("Val")]
    public List<string> Values { get; set; } = new();
}

public class SDI
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("DAI")]
    public List<DAI> DataAttributeInstances { get; set; } = new();
}

public class DataTypeTemplates
{
    [XmlElement("LNodeType")]
    public List<LNodeType> LNodeTypes { get; set; } = new();

    [XmlElement("DOType")]
    public List<DOType> DOTypes { get; set; } = new();

    [XmlElement("DAType")]
    public List<DAType> DATypes { get; set; } = new();

    [XmlElement("EnumType")]
    public List<EnumType> EnumTypes { get; set; } = new();
}

public class LNodeType
{
    [XmlAttribute("id")]
    public string Id { get; set; } = string.Empty;

    [XmlAttribute("lnClass")]
    public string LnClass { get; set; } = string.Empty;

    [XmlElement("DO")]
    public List<DO> DataObjects { get; set; } = new();
}

public class DO
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("type")]
    public string Type { get; set; } = string.Empty;
}

public class DOType
{
    [XmlAttribute("id")]
    public string Id { get; set; } = string.Empty;

    [XmlAttribute("cdc")]
    public string Cdc { get; set; } = string.Empty;

    [XmlElement("DA")]
    public List<DA> DataAttributes { get; set; } = new();

    [XmlElement("SDO")]
    public List<SDO> SubDataObjects { get; set; } = new();
}

public class DA
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("bType")]
    public string BType { get; set; } = string.Empty;

    [XmlAttribute("fc")]
    public string Fc { get; set; } = string.Empty;

    [XmlAttribute("type")]
    public string Type { get; set; } = string.Empty;

    [XmlAttribute("dchg")]
    public bool Dchg { get; set; }

    [XmlAttribute("qchg")]
    public bool Qchg { get; set; }

    [XmlAttribute("dupd")]
    public bool Dupd { get; set; }

    [XmlElement("Val")]
    public string? Val { get; set; }
}

public class SDO
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("type")]
    public string Type { get; set; } = string.Empty;
}

public class DAType
{
    [XmlAttribute("id")]
    public string Id { get; set; } = string.Empty;

    [XmlElement("BDA")]
    public List<BDA> BasicDataAttributes { get; set; } = new();
}

public class BDA
{
    [XmlAttribute("name")]
    public string Name { get; set; } = string.Empty;

    [XmlAttribute("bType")]
    public string BType { get; set; } = string.Empty;

    [XmlAttribute("type")]
    public string Type { get; set; } = string.Empty;
}

public class EnumType
{
    [XmlAttribute("id")]
    public string Id { get; set; } = string.Empty;

    [XmlElement("EnumVal")]
    public List<EnumVal> EnumValues { get; set; } = new();
}

public class EnumVal
{
    [XmlAttribute("ord")]
    public int Ord { get; set; }

    [XmlText]
    public string Value { get; set; } = string.Empty;
}

