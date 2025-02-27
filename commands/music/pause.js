const { SlashCommandBuilder } = require("@discordjs/builders");
const { embedMessage } = require("../../modules/embedSimple");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pauses the song"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guild);

    if (!queue || !queue.playing)
      return await interaction.followUp({
        embeds: [
          embedMessage("#9dcc37", `❌ | There is nothing playing to pause!`),
        ],
      });

    try {
      if (queue) {
        await queue.setPaused(true);
        await interaction.followUp({
          embeds: [
            embedMessage(
              "#9dcc37",
              `✅ **${queue.current.title}** paused [<@${interaction.user.id}>]`
            ),
          ],
        });
      }
    } catch (err) {
      client.logger(err.message, "error");
      await interaction.followUp({
        embeds: [embedMessage("#9dcc37", "Could not pause the song")],
      });
    }
  },
};
