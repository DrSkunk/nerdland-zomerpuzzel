import { Message } from 'discord.js';
import { Command } from '../types/Command';

const command: Command = {
  names: ['ping'],
  description:
    'Stuur een ping om te zien hoe snel de server van de bot reageert.',
  params: [],
  execute,
  adminOnly: false,
};

async function execute(msg: Message): Promise<void> {
  msg.reply(`Pong! \`${Date.now() - msg.createdTimestamp}ms\``);
}
export = command;
