const express = require('express');
const router = express.Router();
const Config = require('../../models/Config');
const { authAdmin, authService } = require('../../middleware/auth');

// @route   POST /api/v1/config
// @desc    Create or Update configuration (Upsert)
// @access  Admin only
router.post('/', authAdmin, async (req, res) => {
  try {
    const { service_name, environment, key, value } = req.body;

    // Validate required fields
    if (!service_name || !environment || !key || !value) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: service_name, environment, key, value',
      });
    }

    // Upsert: Find and update if exists, create if not
    const config = await Config.findOneAndUpdate(
      { service_name, environment, key },
      { value, last_updated: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      status: 'success',
      message: 'Configuration upserted successfully.',
      data: config,
    });
  } catch (error) {
    console.error('Error upserting configuration:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

// @route   GET /api/v1/config/:service/:env/:key
// @desc    Get specific configuration
// @access  Service (or Admin)
router.get('/:service/:env/:key', authService, async (req, res) => {
  try {
    const { service, env, key } = req.params;

    const config = await Config.findOne({
      service_name: service,
      environment: env,
      key: key,
    });

    if (!config) {
      return res.status(404).json({
        status: 'error',
        message: 'Configuration not found',
      });
    }

    // Return only the specified fields
    res.status(200).json({
      key: config.key,
      value: config.value,
      environment: config.environment,
      service_name: config.service_name,
    });
  } catch (error) {
    console.error('Error fetching configuration:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
});

module.exports = router;
