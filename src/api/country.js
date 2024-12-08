const {makeRequest, getQueryString} = require('../utils/request');
const {base64ToBuffer} = require('../utils/converters');

const CountryAPI = (apiToken) => ({
    /*
    * @param {string} server - The server to get the country from
    * @param {number} week - The week to get the notations from
    * @param {string} country - The country to get the notations from
    * @returns {Promise<object>} - The notations information
     */
    async getNotations({server, week = Math.floor((Date.now() / 1000 - 342100) / 604800) - 1, country = null}) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (week && typeof week !== 'number') throw new Error('Invalid week');
        if (country && typeof country !== 'string') throw new Error('Invalid country');

        const params = { week, country, server };
        const queryString = await getQueryString(params);
        return makeRequest(apiToken,'GET', `notations${queryString}`);
    },

    /*
    * @param {string} server - The server to get the country from
    * @param {string} country - The country to get the information from
    * @returns {Promise<object>} - The country information
    * */
    async get(server, country) {
        if (server && typeof server !== 'string') throw new Error('Invalid server');
        if (country && typeof country !== 'string') throw new Error('Invalid country');
        return makeRequest(apiToken, 'GET', `country/${server}/${country}`);
    },

    async convertFlagToBuffer(flag) {
        return base64ToBuffer(flag);
    }


})

module.exports = CountryAPI;
