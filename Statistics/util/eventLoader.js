const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('message'));
  client.on('messageCreate', reqEvent('messageStats'));
  client.on('voiceStateUpdate', reqEvent('StreamerCamera'));
  client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  client.on('voiceStateUpdate', reqEvent('voiceStateUpdate'));
};

