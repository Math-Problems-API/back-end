const Preset = require("../../models/Preset");
const gql = require("../../utils/gql");

module.exports = {
  createPreset: async ({ presetInput }) => {
    const preset = {
      ...presetInput,
      query: presetInput.query.replace(/\n/g, '')
    }

    return await Preset.add(preset);
  },
  presets: async () => await Preset.getAll()
}