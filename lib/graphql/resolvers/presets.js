const Preset = require("../../models/Preset");

module.exports = {
  createPreset: async (args) => {
    const preset = await Preset
      .add(args.presetInput)
      .then(preset => res.send(preset))
      .catch(next);

    return preset;
  },
  presets: async () => await Preset.getAll(),
  preset: async ({ name }) => await Preset.findByName(name)
}