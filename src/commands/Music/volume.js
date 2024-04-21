const Command = require("../../structures/Command.js");

module.exports = class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: {
        content: "Sets the volume of the player",
        examples: ["volume 100"],
        usage: "volume <number>",
      },
      category: "music",
      aliases: ["vol"],
      cooldown: 3,
      args: true,
      player: {
        voice: true,
        dj: true,
        active: true,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [
        {
          name: "number",
          description: "The volume you want to set",
          type: 4,
          required: true,
        },
      ],
    });
  }
  async run(client, ctx, args) {
    const player = client.queue.get(ctx.guild.id);
    const embed = this.client.embed();
    const number = Number(args[0]);
    if (isNaN(number))
      return await ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setDescription("Please provide a valid number."),
        ],
      });
    if (number > 200)
      return await ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setDescription("The volume can't be higher than 200."),
        ],
      });
    if (number < 0)
      return await ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setDescription("The volume can't be lower than 0."),
        ],
      });
    player.player.setGlobalVolume(number);
    return await ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setDescription(`Set the volume to ${player.player.volume}`),
      ],
    });
  }
};
