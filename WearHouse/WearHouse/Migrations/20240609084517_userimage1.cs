using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WearHouse.Migrations
{
    /// <inheritdoc />
    public partial class userimage1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Users",
                type: "datetime(6)",
                nullable: true,
                defaultValue: new DateTime(2024, 6, 9, 10, 45, 16, 895, DateTimeKind.Local).AddTicks(8431),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true,
                oldDefaultValue: new DateTime(2024, 6, 9, 9, 21, 29, 955, DateTimeKind.Local).AddTicks(9259));

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Users",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Users");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Users",
                type: "datetime(6)",
                nullable: true,
                defaultValue: new DateTime(2024, 6, 9, 9, 21, 29, 955, DateTimeKind.Local).AddTicks(9259),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true,
                oldDefaultValue: new DateTime(2024, 6, 9, 10, 45, 16, 895, DateTimeKind.Local).AddTicks(8431));
        }
    }
}
