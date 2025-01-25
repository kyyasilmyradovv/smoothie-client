const fetch = require('node-fetch');

const BRIAN_API_URL = 'https://api.brianknows.org/api/v0/agent';
const BRIAN_API_KEY = 'brian_zSyJc5hFxdckZ0Sms';

const brianService = {
  /**
   * Handles interaction with the Brian API.
   * @param {string} prompt - The user input prompt.
   * @param {string} address - The wallet address initiating the request.
   * @param {Array} messages - Conversation history for maintaining session context.
   * @param {string} [chainId] - Optional chain ID for transactions.
   * @returns {Promise<object>} Response from the Brian API.
   */
  async interactWithAgent({ prompt, address, messages = [], chainId = null }) {
    try {
      const body = {
        prompt,
        address,
        messages,
      };

      if (chainId) body.chainId = chainId;

      const response = await fetch(BRIAN_API_URL, {
        method: 'POST',
        headers: {
          'X-Brian-Api-Key': BRIAN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Brian API Error');
      }

      return await response.json();
    } catch (error) {
      console.error('Error interacting with Brian API:', error);
      throw error;
    }
  },
};

module.exports = brianService;
