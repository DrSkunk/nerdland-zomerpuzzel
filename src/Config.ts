const Prefix = process.env.PREFIX as string;
const DiscordToken = process.env.DISCORD_TOKEN as string;
const TextChannelId = process.env.TEXT_CHANNEL_ID as string;

const toCheck = ['PREFIX', 'DISCORD_TOKEN', 'TEXT_CHANNEL_ID'];

function getMissingConfigKeys(): string[] {
  const missingKeys: string[] = [];
  for (const key of toCheck) {
    if (!Object.keys(process.env).includes(key)) {
      missingKeys.push(key);
    }
  }
  return missingKeys;
}

export { Prefix, DiscordToken, TextChannelId, getMissingConfigKeys };
