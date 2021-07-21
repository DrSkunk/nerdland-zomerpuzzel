import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../types/Command';
import packageJson from '../../package.json';

const command: Command = {
  names: ['version', 'v'],
  description: 'Get current bot version.',
  params: [],
  execute,
  adminOnly: false,
};

async function execute(msg: Message): Promise<void> {
  const embed = new MessageEmbed();

  embed.setTitle('Nerdland Zomerpuzzel');
  embed.setDescription(
    'Ga naar https://github.com/DrSkunk/nerdland-zomerpuzzel voor de broncode te bekijken.'
  );
  embed.setURL('https://github.com/DrSkunk/nerdland-zomerpuzzel');

  embed.addField('Version', `v${packageJson.version}`);

  embed.setFooter(
    'Made with ❤️ by Autom and DrSkunk',
    'https://i.imgur.com/RPKkHMf.png'
  );

  await msg.channel.send({ embeds: [embed] });
}
export = command;
