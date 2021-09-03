module.exports = {
  name: "guildDelete",
  async execute(guild) {
    const guilds = guild.client.guilds.cache.map((guild) => guild.id);
    guild.client.user.setActivity(`${guilds.length} Servers!`, {
      type: "WATCHING",
    });
  },
};
