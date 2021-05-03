const Preset = require("../../models/Preset");

module.exports = {
  createPreset: async ({ presetInput }) => {
    const preset = {
      ...presetInput,
      query: presetInput.query.replace(/\n/g, '')
    }

    return await Preset.add(preset);
  },
  presets: async () => await Preset.getAll(),
  preset: async ({ name }) => {
    const preset = await Preset.findByName(name);

    
  }
}