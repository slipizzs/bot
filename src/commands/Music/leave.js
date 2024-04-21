const Command = require("../../structures/Command.js");

module.exports = class Leave extends Command {
  constructor(client) {
    super(client, {
      name: "leave",
      description: {
        content: "Leaves the voice channel",
        examples: ["leave"],
        usage: "leave",
      },
      category: "music",
      aliases: ["dc"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: true,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [],
    });
  }
  async run(client, ctx) {
    const player = client.queue.get(ctx.guild.id);
    const embed = this.client.embed();
    if (player) {
      ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.main)
            .setDescription(
              `Left <#${
                player.node.manager.connections.get(ctx.guild.id).channelId
              }>`
            ),
        ],
      });
      player.destroy();
    } else {
      ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setDescription(`I'm not in a voice channel`),
        ],
      });
    }
  }
};
