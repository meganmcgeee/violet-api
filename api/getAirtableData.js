const axios = require(`axios`);
const get = require(`lodash/fp/get`);
const compact = require(`lodash/fp/compact`);
const map = require(`lodash/fp/map`);

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || `keyhxGoAKpWTeZbHq`;

module.exports = endpoint => () => {
  return axios.get(`https://api.airtable.com/v0/appSJgJTAG6l4PfT9/drugInfo?api_key=${AIRTABLE_API_KEY}`)
    .then(get(`data.records`))
    .then(map(toFBMessage))
    .then(compact)
    .then(JSON.stringify);

  function toFBMessage({
    fields: {
      drugName: drugName,
      isCombination: isCombination,
      sideEffects: sideEffects,
      conditionsItHelps: conditionsItHelps,
      conditionsItWorsens: conditionsItWorsens
    },
  }) {
    if (isCombination === `No`) {
      return {
        text: `${drugName} is a progestin pill that may produce the following side effects: ${sideEffects}. It may help with the following conditions: ${conditionsItHelps}. It may worsen the following conditions ${conditionsItWorsens} `,
      };
    }

    return undefined;
  }
};
