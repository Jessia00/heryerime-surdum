const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('message'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildMemberAdd', reqEvent('İnviteMemberAdd'));
  client.on('inviteDelete', reqEvent('İnviteDelete'));
  client.on('inviteCreate', reqEvent('İnviteCreate'));
  client.on('guildMemberRemove', reqEvent('İnviteMemberRemove'));
  client.on('deleteStats', reqEvent('ready'));

};
