const { SlashCommandBuilder } = require("@discordjs/builders");
const { embedMessage } = require("../../modules/embedSimple");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skips a song from the queue"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const usermention = `<@${interaction.member.id}>`;
    const queue = client.player.getQueue(interaction.guild);

    if (!queue || !queue.playing)
      return await interaction.followUp({
        embeds: [
          embedMessage(
            "#9dcc37",
            `❌ | No music is being played! [${usermention}]`
          ),
        ],
      });

    try {
      const currnetSong = queue.current;
      await queue.skip();
      return await interaction.followUp({
        embeds: [
          embedMessage(
            "#9dcc37",
            `Skipped **${currnetSong.title}**, [<@${interaction.user.id}>]`
          ),
        ],
      });
    } catch (err) {
      client.logger(err.message, "error");
      await interaction.followUp({
        embeds: [embedMessage("#9dcc37", "Song could not be skipped")],
      });
    }
  },
};
