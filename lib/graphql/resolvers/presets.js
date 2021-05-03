const Preset = require("../../models/Preset");

module.exports = {
  createPreset: async ({ presetInput }) => {
    const preset = {
      ...presetInput,
      query: presetInput.query.replace(/\n/g, '')
    }

    return await Preset
      .add(preset)
      .then(preset => res.send(preset))
      .catch(next);
  },
  presets: async () => await Preset.getAll(),
  preset: async ({ name }) => await Preset.findByName(name)
}