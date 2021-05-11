type preset = {
  id: number,
  name: string,
  query: string
}

const myPreset: preset = {
  id: 1, 
  name: 'My Preset', 
  query: 'mutation { ... }'
}

export default myPreset;
