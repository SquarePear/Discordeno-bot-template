import { botCache } from "../../mod.ts";
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/handlers/channel.ts";
import { botID } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v7/src/module/client.ts";
import { translate } from "../utils/i18next.ts";
import { Embed } from "../utils/Embed.ts";

botCache.commands.set(`help`, {
  name: `help`,
  arguments: [
    {
      name: "command",
      type: "string",
      lowercase: true,
    },
  ],
  execute: function (message, args: HelpArgs) {
    if (!args.command) {
      return sendMessage(message.channel, `No command provided.`);
    }

    const command = botCache.commands.get(args.command);
    if (!command) {
      return sendMessage(message.channel, `Command ${args.command} not found.`);
    }

    const embed = new Embed()
      .setAuthor(
        translate(
          message.guildID!,
          `commands/help:AUTHOR`,
          { name: args.command },
        ),
      )
      .setDescription(
        translate(message.guildID!, `commands/${args.command}:DESCRIPTION`),
      );

    sendMessage(
      message.channel,
      { embed },
    );
  },
});

interface HelpArgs {
  command?: string;
}