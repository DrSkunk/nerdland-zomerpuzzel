import { getDiscordInstance } from './DiscordClient';
import fs from 'fs/promises';
import { IMAGES_PATH } from './Constants';
import path from 'path';
import { Log } from './Log';

export default async function postPuzzle(): Promise<void> {
  Log.log('Posting puzzle');

  const discord = getDiscordInstance();
  const images = (await fs.readdir(IMAGES_PATH)).filter((file) =>
    file.endsWith('.jpg')
  );
  const puzzleDate = new Date()
    .toLocaleString('zh-cn', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split(' ')[0]
    .replace(/\//g, '-');

  const puzzles = JSON.parse(
    await fs.readFile(path.resolve('./assets/puzzles.json'), 'utf-8')
  );

  const dates = Object.keys(puzzles);
  dates.sort();
  const puzzleIndex = dates.indexOf(puzzleDate);
  if (puzzleIndex === -1) {
    Log.error('Puzzle date not found');
    discord.sendMessage('Laatste puzzel werd niet gevonden.');
    return;
  }
  if (!images[puzzleIndex]) {
    Log.error('Puzzle image not found');
    discord.sendMessage('Puzzel afbeelding werd niet gevonden.');
    return;
  }
  const previousDate = dates[puzzleIndex - 1];
  // let text = '!notify zomerpuzzel\n\n';
  let text = '';
  if (previousDate) {
    const previousAnswer = (puzzles as Record<string, string>)[previousDate];
    text += `Antwoord van Puzzel #${puzzleIndex}: ||${previousAnswer}||\n\n`;
  }
  text += `Puzzel #${puzzleIndex + 1}:`;
  const imagePath = path.join(IMAGES_PATH, images[puzzleIndex]);

  await discord.sendMessage({
    content: text,
    files: [
      {
        attachment: imagePath,
        name: `${puzzleDate}.jpg`,
      },
    ],
  });
}
