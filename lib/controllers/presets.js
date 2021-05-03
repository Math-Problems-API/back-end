const { Router } = require('express');
const gql = require('../utils/gql');
const Preset = require('../models/Preset');

module.exports = Router()
  .get('/:preset', async (req, res, next) => {
    const { preset } = req.params;

    const { query } = await Preset
      .findByName(preset)
      .catch(next);

    req.body.query = query;

    gql(req, res);
  });
