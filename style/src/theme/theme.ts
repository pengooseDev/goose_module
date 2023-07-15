import { Theme } from './types';

export const lightTheme: Theme = {
  color: {
    primary: '#30B198',
    secondary: '#FFC857',
    accentColor: '#EF476F',
    default: '#191A23',
    light: '#E0E0E0',
    transparent: 'rgba(25, 26, 35, 0.65)',
    border: '#C9D5DB',
  },
  background: {
    default: '#F8FAFB',
    primary: '#F0F1F5',
    secondary: '#E2E2E2',
    tertiary: '#C9D5DB',
    quaternary: '#B0BEC5',
    quinary: '#90A4AE',
    transparent: 'rgba(245, 246, 247, 0.65)',
    hover: '#F0F1F5',
  },
  transitionOption: 'ease-in-out 0.15s',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.16)',
};

export const darkTheme: Theme = {
  color: {
    primary: '#30B198',
    secondary: '#FFC857',
    accentColor: '#EF476F',
    default: '#E2E2E2',
    light: '#A4A5B2',
    transparent: 'rgba(245, 246, 247, 0.65)',
    border: '#2C2D3C',
  },
  background: {
    default: '#191A23',
    primary: '#14141C',
    secondary: '#181821',
    tertiary: '#393A49',
    quaternary: '#82838F',
    quinary: '#4F5060',
    transparent: '#21232E',
    hover: '#1C1D2A',
  },
  transitionOption: 'ease-in-out 0.15s',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.16)',
};
