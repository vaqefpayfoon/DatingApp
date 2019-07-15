using System.Collections.Generic;
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
    }
}