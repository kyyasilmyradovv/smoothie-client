const brianService = require('../services/brianService');

exports.handleChat = async (req, res) => {
  const { prompt, address, chainId, messages = [] } = req.body;

  console.log('Chat prompt received:', prompt, address);

  if (!prompt || !address) {
    return res
      .status(400)
      .json({ error: 'Prompt and user address are required' });
  }

  try {
    const brianResponse = await brianService.interactWithAgent({
      prompt,
      address,
      messages,
      chainId,
    });

    res.status(200).json({ result: brianResponse });
  } catch (error) {
    console.error('Error handling chat:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
