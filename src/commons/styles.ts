import {Dimensions} from 'react-native';

const {scale, width, height} = Dimensions.get('screen');
export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;
export const DEVICE_SCALE = scale;

export const COMMON_STYLES = {
  flex1: {flex: 1},
  backgroundColor: {
    backgroundColor: '#fff',
  },
};
