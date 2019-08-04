using System.Linq;
using AutoMapper;
using DatingAppAPI.Dtos;
using DatingAppAPI.Models;

namespace DatingAppAPI.Helper
{ 
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //public delegate TResult Func<in T,out TResult>(T arg);
            //CreateMap<import, Export>();
            //_mapper.Map<ExportObject>(ImportObject);
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            //return necessary data after login
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();   
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => 
                    opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => 
                    opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));        
        }
    }   
}