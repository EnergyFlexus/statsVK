﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VkDb;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(VkDbContext))]
    partial class VkDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("VkDb.Chat", b =>
                {
                    b.Property<long>("chat_id")
                        .HasColumnType("bigint");

                    b.Property<long>("last_message_date")
                        .HasColumnType("bigint");

                    b.HasKey("chat_id");

                    b.ToTable("chats");
                });

            modelBuilder.Entity("VkDb.ChatUser", b =>
                {
                    b.Property<long>("chat_id")
                        .HasColumnType("bigint");

                    b.Property<long>("user_id")
                        .HasColumnType("bigint");

                    b.Property<long>("messages_count")
                        .HasColumnType("bigint");

                    b.HasKey("chat_id", "user_id");

                    b.ToTable("chat_users");
                });

            modelBuilder.Entity("VkDb.Message", b =>
                {
                    b.Property<long>("message_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("chat_id")
                        .HasColumnType("bigint");

                    b.Property<long>("date")
                        .HasColumnType("bigint");

                    b.Property<string>("text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("user_id")
                        .HasColumnType("bigint");

                    b.HasKey("message_id");

                    b.HasIndex("chat_id", "user_id");

                    b.ToTable("messages");
                });

            modelBuilder.Entity("VkDb.ChatUser", b =>
                {
                    b.HasOne("VkDb.Chat", "chat")
                        .WithMany("chat_users")
                        .HasForeignKey("chat_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("chat");
                });

            modelBuilder.Entity("VkDb.Message", b =>
                {
                    b.HasOne("VkDb.ChatUser", "chat_user")
                        .WithMany("messages")
                        .HasForeignKey("chat_id", "user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("chat_user");
                });

            modelBuilder.Entity("VkDb.Chat", b =>
                {
                    b.Navigation("chat_users");
                });

            modelBuilder.Entity("VkDb.ChatUser", b =>
                {
                    b.Navigation("messages");
                });
#pragma warning restore 612, 618
        }
    }
}
