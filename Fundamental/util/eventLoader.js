const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('messageCreate', reqEvent('message'));
  client.on('userUpdate', reqEvent('userUpdate'));
  client.on('ready', () =>  reqEvent('checkPenals')(client));
  client.on('messageCreate', reqEvent('afk'));
};