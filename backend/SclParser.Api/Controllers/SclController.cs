using Microsoft.AspNetCore.Mvc;
using SclParser.Api.Models;
using SclParser.Api.Services;

namespace SclParser.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SclController : ControllerBase
{
    private static SclDocument? _cachedDocument;
    private readonly SclParserService _parserService;
    private readonly ILogger<SclController> _logger;

    public SclController(SclParserService parserService, ILogger<SclController> logger)
    {
        _parserService = parserService;
        _logger = logger;
    }

    [HttpPost("parse")]
    public IActionResult ParseFile(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { error = "No file provided" });
            }

            if (!file.FileName.EndsWith(".cid", StringComparison.OrdinalIgnoreCase) &&
                !file.FileName.EndsWith(".icd", StringComparison.OrdinalIgnoreCase) &&
                !file.FileName.EndsWith(".scd", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { error = "Invalid file type. Expected .cid, .icd, or .scd file" });
            }

            using var stream = file.OpenReadStream();
            _cachedDocument = _parserService.ParseSclFile(stream);

            _logger.LogInformation("Successfully parsed SCL file: {FileName}", file.FileName);

            return Ok(new
            {
                success = true,
                message = "File parsed successfully",
                data = _cachedDocument
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error parsing SCL file");
            return StatusCode(500, new { error = $"Error parsing file: {ex.Message}" });
        }
    }

    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        try
        {
            if (_cachedDocument == null)
            {
                return NotFound(new { error = "No SCL document loaded. Please parse a file first." });
            }

            var summary = _parserService.GetSummary(_cachedDocument);
            return Ok(summary);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting summary");
            return StatusCode(500, new { error = $"Error getting summary: {ex.Message}" });
        }
    }

    [HttpGet("devices")]
    public IActionResult GetDevices()
    {
        try
        {
            if (_cachedDocument == null)
            {
                return NotFound(new { error = "No SCL document loaded. Please parse a file first." });
            }

            var devices = _parserService.GetIedInfoList(_cachedDocument);
            return Ok(devices);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting devices");
            return StatusCode(500, new { error = $"Error getting devices: {ex.Message}" });
        }
    }

    [HttpGet("devices/{name}")]
    public IActionResult GetDeviceByName(string name)
    {
        try
        {
            if (_cachedDocument == null)
            {
                return NotFound(new { error = "No SCL document loaded. Please parse a file first." });
            }

            var device = _cachedDocument.IEDs.FirstOrDefault(ied =>
                ied.Name.Equals(name, StringComparison.OrdinalIgnoreCase));

            if (device == null)
            {
                return NotFound(new { error = $"Device '{name}' not found" });
            }

            return Ok(device);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting device");
            return StatusCode(500, new { error = $"Error getting device: {ex.Message}" });
        }
    }

    [HttpGet("communication")]
    public IActionResult GetCommunication()
    {
        try
        {
            if (_cachedDocument == null)
            {
                return NotFound(new { error = "No SCL document loaded. Please parse a file first." });
            }

            var commInfo = _parserService.GetCommunicationInfo(_cachedDocument);

            if (commInfo == null)
            {
                return NotFound(new { error = "No communication information found" });
            }

            return Ok(commInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting communication info");
            return StatusCode(500, new { error = $"Error getting communication info: {ex.Message}" });
        }
    }

    [HttpGet("document")]
    public IActionResult GetFullDocument()
    {
        try
        {
            if (_cachedDocument == null)
            {
                return NotFound(new { error = "No SCL document loaded. Please parse a file first." });
            }

            return Ok(_cachedDocument);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting document");
            return StatusCode(500, new { error = $"Error getting document: {ex.Message}" });
        }
    }

    [HttpDelete("clear")]
    public IActionResult ClearCache()
    {
        _cachedDocument = null;
        return Ok(new { success = true, message = "Cache cleared" });
    }

    [HttpGet("test-serialization")]
    public IActionResult TestSerialization()
    {
        var testDoc = new SclDocument
        {
            IEDs = new List<IED>
            {
                new IED
                {
                    Name = "TestIED",
                    Manufacturer = "TestMfg",
                    ConfigVersion = "1.0",
                    AccessPoints = new List<AccessPoint>()
                }
            }
        };
        return Ok(testDoc);
    }
}

