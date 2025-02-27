const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const { embedMessage } = require("../../modules/embedSimple");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletemessages")
    .setDescription("deletes x number of messages")
    .addIntegerOption((option) =>
      option.setName("int").setDescription("Enter an integer").setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();
    const integer = interaction.options.getInteger("int");

    if (
      !interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])
    )
      return await interaction.followUp({
        embeds: [
          embedMessage(
            "#9dcc37",
            `❌ | You do not have permission to delete Messages!`
          ),
        ],
      });

    try {
      const getMessages = await interaction.channel.messages.fetch({
        limit: 100,
      });
      await interaction.channel.bulkDelete(integer);
    } catch (error) {
      client.logger(error.message, "error");
      const errorEmbed = {
        color: "#9dcc37",
        description: `💥 ${error.message}`,
      };
      await interaction.followUp({ embeds: [errorEmbed] });
    }
  },
};
