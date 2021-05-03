const { Router } = require('express');
const gql = require('../utils/gql');
const Preset = require('../models/Preset');

module.exports = Router()
  .get('/:name', async (req, res, next) => {
    const { name } = req.params;

    const { query } = await Preset
      .findByName(name)
      .catch(next);

    req.body.query = query;

    gql(req, res);
  });
