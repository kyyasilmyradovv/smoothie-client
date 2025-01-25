const fetch = require('node-fetch');

const BRIAN_API_URL = 'https://api.brianknows.org/api/v0/agent';
const BRIAN_API_KEY = 'brian_D7FzZdWEsB3N8sges';

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
        messages: messages.length
          ? messages
          : [{ sender: 'user', content: prompt }], // Ensure at least one message
        chainId,
        kbId: 'public-knowledge-box', // Added kbId
      };

      // Log the request payload
      console.log('Request Payload:', JSON.stringify(body, null, 2));

      const response = await fetch(BRIAN_API_URL, {
        method: 'POST',
        headers: {
          'X-Brian-Api-Key': BRIAN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response from Brian API:', errorData);
        throw new Error(errorData.error || 'Brian API Error');
      }

      const data = await response.json();

      // Log the successful response
      console.log('Response from Brian API:', JSON.stringify(data, null, 2));

      return data;
    } catch (error) {
      console.error('Error interacting with Brian API:', error);
      throw error;
    }
  },
};

module.exports = brianService;
