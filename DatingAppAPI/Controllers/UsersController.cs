using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingAppAPI.Data;
using DatingAppAPI.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppAPI.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class UsersController : Controller {
        private IDatingRepository _context;
        public IMapper _mapper { get; }
        public UsersController (IDatingRepository context, IMapper mapper) {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers () {
            var users = await _context.GetUsers ();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok (usersToReturn);
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _context.GetUser (id);
            
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok (userToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _context.GetUser(id);

            if (userFromRepo == null)
                return NotFound($"Could not find user with an ID of {id}");

            if (currentUserId != userFromRepo.Id)
                return Unauthorized();
            
            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _context.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }
    }
}