const Command = require("../../structures/Command.js");

module.exports = class Nowplaying extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: {
        content: "Shows the currently playing song",
        examples: ["nowplaying"],
        usage: "nowplaying",
      },
      category: "music",
      aliases: ["np"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: false,
        active: true,
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
    const track = player.current;
    const position = player.player.position;
    const duration = track.info.length;
    const bar = client.utils.progressBar(position, duration, 20);
    const embed1 = this.client
      .embed()
      .setColor(this.client.color.main)
      .setAuthor({ name: "Now Playing", iconURL: ctx.guild.iconURL({}) })
      .setThumbnail(track.info.artworkUrl)
      .setDescription(
        `[${track.info.title}](${track.info.uri}) - Request By: ${track.info.requester}\n\n\`${bar}\``
      )
      .addFields({
        name: "\u200b",
        value: `\`${client.utils.formatTime(
          position
        )} / ${client.utils.formatTime(duration)}\``,
      });
    return await ctx.sendMessage({ embeds: [embed1] });
  }
};
