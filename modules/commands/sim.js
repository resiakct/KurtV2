const axios = require('axios');

module.exports = new Object({
  config: new Object({
    name: "sim",
    author: "ArYAN | yakiro",
    usePrefix: false,
    description:
"FunChat with SimiSimi",
    usage: "{pn} [ Ewan ]",
    guide: {
      en: ".sim [ chat ]",
    },
  }),
  t: async function (a) {
    try {
      const response = await axios.get(`https://aryan-apis.onrender.com/api/sim?chat=${a}&lang=en&apikey=aryan`);
      return response.data.answer;
    } catch (error) {
      throw error;
    }
  },
  handleCommand: async function ({ message, event, args, api }) {
    try {
      const a = encodeURIComponent(args.join(" "));
      const result = await this.t(a);

      message.reply({
        body: `${result}`,
      }, (err, info) => {
        api.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onRun: function (params) {
    return this.handleCommand(params);
  },
  onReply: function (params) {
    return this.handleCommand(params);
  },
});
