const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('message'));
  client.on('emojiCreate', reqEvent('emojiCreate'));
  client.on('emojiDelete', reqEvent('emojiDelete'));
  client.on('emojiUpdate', reqEvent('emojiUpdate'));
  client.on('guildBanAdd', reqEvent('guildBanAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  client.on('guildUnavailable', reqEvent('guildUnavailable'));
  client.on('guildUpdate', reqEvent('guildUpdate'));

  
};
