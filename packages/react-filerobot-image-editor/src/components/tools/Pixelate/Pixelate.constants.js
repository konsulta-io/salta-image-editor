/** External Dependencies */
import PixelateIcon from '@scaleflex/icons/crop-landscape';

/** Internal Dependencies */
import PixelateIntensityField from './PixelateIntensityField';

export const PIXELATE_INTENSITY = 'pixelate-intensity';

export const PIXELATE_POPPABLE_OPTIONS = [
  {
    titleKey: 'pixelateIntensity',
    name: PIXELATE_INTENSITY,
    Icon: PixelateIcon,
  },
];

export const pixelateOptionsPopupComponents = {
  [PIXELATE_INTENSITY]: PixelateIntensityField,
};
