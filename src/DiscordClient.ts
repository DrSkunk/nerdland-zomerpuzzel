import Discord, { TextChannel } from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { Prefix, TextChannelId } from './Config';
import { Log } from './Log';
import { Command } from './types/Command';

const globPromise = promisify(glob);

class DiscordClient {
  private _token: string;
  private _client: Discord.Client;
  private _commands: Command[];

  get commands() {
    return this._commands;
  }

  constructor(token: string) {
    this._token = token;
    this._client = new Discord.Client();
    this._commands = [];
  }

  start() {
    this._client.on('ready', async () => {
      Log.info(`Logged in!`);
      if (this._client.user) {
        this._client.user
          .setActivity(`${Prefix}help`, { type: 'LISTENING' })
          .then((presence) =>
            Log.info(`Activity set to ${presence.activities[0].name}`)
          )
          .catch(Log.error);
      }
      const commandFiles = await globPromise(`${__dirname}/commands/*.{js,ts}`);

      for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(file) as Command;
        Log.info('Added command', command.names[0]);
        this._commands.push(command);
      }
    });

    this._client.on('message', async (message) => {
      if (!message.guild || !message.content.startsWith(Prefix)) {
        return;
      }

      const [commandName, ...args] = message.content
        .slice(Prefix.length)
        .split(/ +/);

      const command = this._commands.find((c) => c.names.includes(commandName));

      if (command) {
        const isAdmin = message.member?.hasPermission('ADMINISTRATOR');
        if (command.adminOnly && !isAdmin) {
          message.reply('This command is for admins only');
        } else {
          command.execute(message, args);
        }
      } else {
        message.reply(
          `Unrecognized command. Type \`${Prefix}help\` for the list of commands.`
        );
      }
    });
    this._client.login(this._token);
  }

  public async sendMessage(...args: Parameters<typeof channel.send>) {
    const channel = (await this._client.channels.fetch(
      TextChannelId
    )) as TextChannel;
    await channel.send(...args);
  }
}

let instance: DiscordClient | null = null;

export function initDiscord(token: string): void {
  instance = new DiscordClient(token);
}

export function getDiscordInstance(): DiscordClient {
  if (!instance) {
    throw new Error('Discord client not started.');
  }
  return instance;
}
