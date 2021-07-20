import postPuzzle from '../PostPuzzle';
import { Command } from '../types/Command';

const command: Command = {
  names: ['trigger'],
  description: 'Post de laatste puzzel handmatig.',
  params: [],
  execute,
  adminOnly: true,
};

async function execute(): Promise<void> {
  postPuzzle();
}
export = command;
