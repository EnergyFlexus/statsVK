global using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VkDB
{
    public class Chat
    {
    }
    public class ChatUser
    {
    }
    public class VkDBContext : DbContext
    {
        public DbSet<Chat> chats { get; set; } = null!;
        public DbSet<ChatUser> chat_users { get; set; } = null!;
        
        public VkDBContext(DbContextOptions<VkDBContext> options):
            base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
            
    }
}