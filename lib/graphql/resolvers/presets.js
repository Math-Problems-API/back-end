const Preset = require("../../models/Preset");

module.exports = {
  createPreset: async ({ presetInput }) => {
    const preset = {
      ...presetInput,
      query: presetInput.query.replace(/\n/g, '')
    }

    console.log('PRESET INPUT', presetInput);

    return await Preset.add(preset);
  },
  presets: async () => await Preset.getAll()
}