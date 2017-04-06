const axios = require(`axios`);
const get = require(`lodash/fp/get`);
const compact = require(`lodash/fp/compact`);
const map = require(`lodash/fp/map`);

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || `keyhxGoAKpWTeZbHq`;

module.exports = endpoint => () => {
  return axios.get(`https://api.airtable.com/v0/appSJgJTAG6l4PfT9/${endpoint}?api_key=${AIRTABLE_API_KEY}`)
    .then(get(`data.records`))
    .then(map(toFBMessage))
    .then(compact)
    .then(JSON.stringify);

  function toFBMessage({
    fields: {
      drugName: drugName,
      isCombination: isCombination
    },
  }) {
    if (isCombination === `No`) {
      return {
        text: `${drugName} is rad`,
      };
    }

    return undefined;
  }
};
