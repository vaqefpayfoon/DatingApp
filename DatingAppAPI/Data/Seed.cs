using System;
using System.Collections.Generic;
using DatingAppAPI.Models;
using Newtonsoft.Json;

namespace DatingAppAPI.Data
{
    public class Seed
    {
        private DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }
        public void SeedUser()
        {
            //_context.Users.RemoveRange(_context.Users);
            //_context.SaveChanges();

            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwordHash, passwordSault;
                CreatePasswordHash("password", out passwordHash, out passwordSault);
                user.PasswordHash = passwordHash;
                user.PasswordSult = passwordSault;
                user.Username = user.Username;
                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}