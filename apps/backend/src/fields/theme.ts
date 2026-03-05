import { Field } from 'payload'

const customThemes = [
  { label: '[Custom] Agency Default', value: 'agency-default' },
]

const lightThemes = [
  { label: '[Light] Light (Default)', value: 'light' },
  { label: '[Light] Cupcake', value: 'cupcake' },
  { label: '[Light] Bumblebee', value: 'bumblebee' },
  { label: '[Light] Emerald', value: 'emerald' },
  { label: '[Light] Corporate', value: 'corporate' },
  { label: '[Light] Retro', value: 'retro' },
  { label: '[Light] Cyberpunk', value: 'cyberpunk' },
  { label: '[Light] Valentine', value: 'valentine' },
  { label: '[Light] Garden', value: 'garden' },
  { label: '[Light] Aqua', value: 'aqua' },
  { label: '[Light] Lofi', value: 'lofi' },
  { label: '[Light] Pastel', value: 'pastel' },
  { label: '[Light] Fantasy', value: 'fantasy' },
  { label: '[Light] Wireframe', value: 'wireframe' },
  { label: '[Light] Cmyk', value: 'cmyk' },
  { label: '[Light] Autumn', value: 'autumn' },
  { label: '[Light] Acid', value: 'acid' },
  { label: '[Light] Lemonade', value: 'lemonade' },
  { label: '[Light] Winter', value: 'winter' },
  { label: '[Light] Nord', value: 'nord' },
]

const darkThemes = [
  { label: '[Dark] Dark (Default)', value: 'dark' },
  { label: '[Dark] Synthwave', value: 'synthwave' },
  { label: '[Dark] Halloween', value: 'halloween' },
  { label: '[Dark] Forest', value: 'forest' },
  { label: '[Dark] Black', value: 'black' },
  { label: '[Dark] Luxury', value: 'luxury' },
  { label: '[Dark] Dracula', value: 'dracula' },
  { label: '[Dark] Business', value: 'business' },
  { label: '[Dark] Night', value: 'night' },
  { label: '[Dark] Coffee', value: 'coffee' },
  { label: '[Dark] Dim', value: 'dim' },
  { label: '[Dark] Sunset', value: 'sunset' },
]

type ThemeFieldArgs = {
  name?: string
  required?: boolean
  defaultValue?: string
  admin?: Record<string, any>
}

/**
 * Creates a centralized Dropdown selector for all Custom, Light, and Dark DaisyUI Themes.
 */
export const createThemeField = (args?: ThemeFieldArgs): Field => {
  return {
    name: args?.name || 'theme',
    type: 'select',
    required: args?.required || false,
    defaultValue: args?.defaultValue,
    admin: {
      description: 'Select a theme to apply styling colors.',
      isClearable: !args?.required,
      ...args?.admin,
    },
    options: [
      ...customThemes,
      ...lightThemes,
      ...darkThemes,
    ],
  }
}
