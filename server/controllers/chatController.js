const brianService = require('../services/brianService');

exports.handleChat = async (req, res) => {
  const { prompt, address, chainId, messages = [] } = req.body;

  console.log('Received Chat Request:');
  console.log('Prompt:', prompt);
  console.log('Address:', address);
  console.log('Chain ID:', chainId);
  console.log('Messages:', messages);

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

    // Log the successful response from Brian
    console.log('Brian API Response:', brianResponse);

    res.status(200).json({ result: brianResponse });
  } catch (error) {
    console.error('Error handling chat:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
