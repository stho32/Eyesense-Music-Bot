const { SlashCommandBuilder } = require("@discordjs/builders");
const { embedMessage } = require("../../modules/embedSimple");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("disconnects from the channel"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      return await interaction.followUp({
        embeds: [
          embedMessage("#9dcc37", `❌ I am not connected to a voice channel!`),
        ],
      });
    }

    try {
      if (queue) {
        await queue.destroy(true);
        await interaction.followUp({
          embeds: [
            embedMessage(
              "#9dcc37",
              `✅ **${interaction.client.user.username}** disconnected from [<#${interaction.member.voice.channelId}>]`
            ),
          ],
        });
      }
    } catch (err) {
      client.logger(err.message, "error");
      await interaction.followUp({
        embeds: [
          embedMessage(
            "#9dcc37",
            "Could not disconnect the bot, Maybe you do not have permission ?"
          ),
        ],
      });
    }
  },
};
