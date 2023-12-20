using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JPW.Models;
using AutoMapper;
using JPW.DTO;

// InterviewsController.cs
[ApiController]
[Route("api/interviews")]
public class InterviewsController : ControllerBase
{
    private readonly JPWContext _context;
    private readonly IMapper _mapper;

    public InterviewsController(JPWContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetInterviews()
    {
        var interviews = _context.Interviews.ToList();
        var interviewDTOs = _mapper.Map<List<InterviewDTO>>(interviews);
        return Ok(interviewDTOs);
    }

    [HttpGet("{id}")]
    public IActionResult GetInterviewById(int id)
    {
        var interview = _context.Interviews.Find(id);

        if (interview == null)
        {
            return NotFound("Interview not found");
        }

        var interviewDTO = _mapper.Map<InterviewDTO>(interview);
        return Ok(interviewDTO);
    }

    [HttpPost("schedule")]
    public IActionResult ScheduleInterview([FromBody] InterviewDTO interviewDTO)
    {
        if (interviewDTO == null || string.IsNullOrEmpty(interviewDTO.JobSeekerId) || interviewDTO.InterviewDate == default)
        {
            return BadRequest("Invalid interview data");
        }

        var interview = _mapper.Map<Interview>(interviewDTO);

        _context.Interviews.Add(interview);
        _context.SaveChanges();

        return CreatedAtAction(nameof(ScheduleInterview), new { id = interview.Id }, "Interview scheduled successfully");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateInterview(int id, [FromBody] InterviewDTO interviewDTO)
    {
        var interviewToUpdate = _context.Interviews.Find(id);

        if (interviewToUpdate == null)
        {
            return NotFound("Interview not found");
        }

        // Update properties if provided in the DTO
        if (!string.IsNullOrEmpty(interviewDTO.JobSeekerId))
        {
            interviewToUpdate.JobSeekerId = interviewDTO.JobSeekerId;
        }

        if (interviewDTO.InterviewDate != default)
        {
            interviewToUpdate.InterviewDate = interviewDTO.InterviewDate;
        }

        if (!string.IsNullOrEmpty(interviewDTO.InterviewTime))
        {
            interviewToUpdate.InterviewTime = interviewDTO.InterviewTime;
        }

        if (!string.IsNullOrEmpty(interviewDTO.InterviewLocation))
        {
            interviewToUpdate.InterviewLocation = interviewDTO.InterviewLocation;
        }

        _context.SaveChanges();

        return Ok("Interview updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteInterview(int id)
    {
        var interviewToDelete = _context.Interviews.Find(id);

        if (interviewToDelete == null)
        {
            return NotFound("Interview not found");
        }

        _context.Interviews.Remove(interviewToDelete);
        _context.SaveChanges();

        return Ok("Interview deleted successfully");
    }
}



