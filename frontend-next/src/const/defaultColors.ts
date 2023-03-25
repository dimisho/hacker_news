export type ThemeVariantType = 'primary' | 'secondary';

export const defaultColors = {
  bgButton: {
    primary: 'PeachPuff',
    secondary: 'LightBlue',
  },
  hoverButton: {
    primary: 'PapayaWhip',
    secondary: 'PowderBlue',
  },
  card: {
    primary: 'Khaki',
    secondary: 'PaleGoldenrod',
  },
  text: {
    primary: 'DarkSlateGrey',
  },
};

type DefaultColorsType = typeof defaultColors;
export const getDefaultColor = (
  colorType: DefaultColorsType[keyof DefaultColorsType],
  variant?: ThemeVariantType,
): string => {
  if (variant && colorType[variant]) return colorType[variant];
  return colorType['primary'];
};
