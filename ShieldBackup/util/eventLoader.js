const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('roleUpdate', reqEvent('roleUpdate'));
  client.on('messageCreate', reqEvent('message'));
  client.on('roleCreate', reqEvent('roleCreate'));
  client.on('channelCreate', reqEvent('channelCreate'));
  client.on('channelUpdate', reqEvent('channelOverwrite'));
  client.on('webhookUpdate', reqEvent('channelWebhook'));
  client.on('roleDelete', reqEvent('roleDelete'));
  client.on('channelDelete', reqEvent('channelDelete'));



  
};