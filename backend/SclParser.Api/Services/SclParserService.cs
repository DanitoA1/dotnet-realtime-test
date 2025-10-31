using System.Xml;
using System.Xml.Serialization;
using SclParser.Api.Models;

namespace SclParser.Api.Services;

public class SclParserService
{
    public SclDocument ParseSclFile(Stream fileStream)
    {
        try
        {
            var serializer = new XmlSerializer(typeof(SclDocument));

            using var reader = XmlReader.Create(fileStream, new XmlReaderSettings
            {
                IgnoreWhitespace = true,
                IgnoreComments = true
            });

            var sclDocument = serializer.Deserialize(reader) as SclDocument;

            if (sclDocument == null)
            {
                throw new InvalidOperationException("Failed to deserialize SCL document");
            }

            return sclDocument;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error parsing SCL file: {ex.Message}", ex);
        }
    }

    public SclSummary GetSummary(SclDocument sclDocument)
    {
        var summary = new SclSummary
        {
            ToolID = sclDocument.Header?.ToolID ?? string.Empty,
            Version = sclDocument.Header?.Version ?? string.Empty,
            TotalIEDs = sclDocument.IEDs.Count,
            TotalLogicalDevices = sclDocument.IEDs.Sum(ied =>
                ied.AccessPoints.Sum(ap => ap.Server?.LDevices.Count ?? 0)),
            TotalLogicalNodes = sclDocument.IEDs.Sum(ied =>
                ied.AccessPoints.Sum(ap =>
                    ap.Server?.LDevices.Sum(ld => ld.LogicalNodes.Count + 1) ?? 0)), // +1 for LN0
            TotalDataSets = sclDocument.IEDs.Sum(ied =>
                ied.AccessPoints.Sum(ap =>
                    ap.Server?.LDevices.Sum(ld => ld.LN0?.DataSets.Count ?? 0) ?? 0)),
            TotalLNodeTypes = sclDocument.DataTypeTemplates?.LNodeTypes.Count ?? 0,
            TotalDOTypes = sclDocument.DataTypeTemplates?.DOTypes.Count ?? 0,
            TotalDATypes = sclDocument.DataTypeTemplates?.DATypes.Count ?? 0
        };

        return summary;
    }

    public List<IedInfo> GetIedInfoList(SclDocument sclDocument)
    {
        var iedInfoList = new List<IedInfo>();

        foreach (var ied in sclDocument.IEDs)
        {
            var connectedAp = sclDocument.Communication?.SubNetworks
                .SelectMany(sn => sn.ConnectedAPs)
                .FirstOrDefault(ca => ca.IedName == ied.Name);

            var ipAddress = connectedAp?.Address?.Parameters
                .FirstOrDefault(p => p.Type == "IP")?.Value ?? string.Empty;

            var logicalDeviceCount = ied.AccessPoints
                .Sum(ap => ap.Server?.LDevices.Count ?? 0);

            var iedInfo = new IedInfo
            {
                Name = ied.Name,
                Manufacturer = ied.Manufacturer,
                ConfigVersion = ied.ConfigVersion,
                IpAddress = ipAddress,
                LogicalDeviceCount = logicalDeviceCount
            };

            iedInfoList.Add(iedInfo);
        }

        return iedInfoList;
    }

    public CommunicationInfo? GetCommunicationInfo(SclDocument sclDocument)
    {
        if (sclDocument.Communication == null)
            return null;

        var commInfo = new CommunicationInfo
        {
            SubNetworks = sclDocument.Communication.SubNetworks.Select(sn => new SubNetworkInfo
            {
                Name = sn.Name,
                ConnectedDevices = sn.ConnectedAPs.Select(ca => new ConnectedDeviceInfo
                {
                    IedName = ca.IedName,
                    AccessPointName = ca.ApName,
                    IpAddress = ca.Address?.Parameters.FirstOrDefault(p => p.Type == "IP")?.Value ?? string.Empty,
                    SubnetMask = ca.Address?.Parameters.FirstOrDefault(p => p.Type == "IP-SUBNET")?.Value ?? string.Empty,
                    Gateway = ca.Address?.Parameters.FirstOrDefault(p => p.Type == "IP-GATEWAY")?.Value ?? string.Empty
                }).ToList()
            }).ToList()
        };

        return commInfo;
    }
}

// DTOs for API responses
public class SclSummary
{
    public string ToolID { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public int TotalIEDs { get; set; }
    public int TotalLogicalDevices { get; set; }
    public int TotalLogicalNodes { get; set; }
    public int TotalDataSets { get; set; }
    public int TotalLNodeTypes { get; set; }
    public int TotalDOTypes { get; set; }
    public int TotalDATypes { get; set; }
}

public class IedInfo
{
    public string Name { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public string ConfigVersion { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public int LogicalDeviceCount { get; set; }
}

public class CommunicationInfo
{
    public List<SubNetworkInfo> SubNetworks { get; set; } = new();
}

public class SubNetworkInfo
{
    public string Name { get; set; } = string.Empty;
    public List<ConnectedDeviceInfo> ConnectedDevices { get; set; } = new();
}

public class ConnectedDeviceInfo
{
    public string IedName { get; set; } = string.Empty;
    public string AccessPointName { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string SubnetMask { get; set; } = string.Empty;
    public string Gateway { get; set; } = string.Empty;
}

