import { themes }  from './themes';

export const components: Record<string, any> = {
  baseIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: themes.colors.deep_black,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
};

export type Components = typeof components;