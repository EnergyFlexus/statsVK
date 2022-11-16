global using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VkDb
{
    public class Chat
    {
		// PK
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public long chat_id {get; set;}

		public long last_message_date {get; set;} = 0;

		public HashSet<ChatUser> chat_users {get; set;} = new();

		public Chat(long chat_id) =>
			this.chat_id = chat_id;
    }
    public class ChatUser
    {
		// PK
		public long chat_id {get; set;}
		public long user_id {get; set;}

		public long messages_count {get; set;} = 0;

		public Chat chat {get; set;} = null!;
		public HashSet<Message> messages {get; set;} = new();

		public ChatUser(long chat_id, long user_id) =>
			(this.chat_id, this.user_id) = (chat_id, user_id);
    }
	public class Message
	{
		// PK
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long message_id {get; set;}

		[Required]
		public string text {get; set;} = null!;
		public long date {get; set;} = 0;

		public ChatUser chat_user {get; set;} = null!;
		public long chat_id {get; set;}
		public long user_id {get; set;}

		public Message()
		{}
	}

    public class VkDbContext : DbContext
    {
        public DbSet<Chat> chats { get; set; } = null!;
        public DbSet<ChatUser> chat_users { get; set; } = null!;
		public DbSet<Message> messages { get; set; } = null!;
        
        public VkDbContext(DbContextOptions<VkDbContext> options):
            base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // СhatUser
            modelBuilder.Entity<ChatUser>().HasKey(u => new { u.chat_id, u.user_id});
            modelBuilder.Entity<ChatUser>()
                .HasOne(u => u.chat)
                .WithMany(c => c.chat_users)
                .HasForeignKey(u => u.chat_id);

			// Messagee
			modelBuilder.Entity<Message>()
                .HasOne(m => m.chat_user)
                .WithMany(cu => cu.messages)
                .HasForeignKey(m => new {m.chat_id, m.user_id});
        }
    }
}