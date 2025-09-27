/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import { StyledSpacedOptionFields } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

const MIN_VALUE = 2;
const MAX_VALUE = 50;

const PixelateIntensityField = ({
  annotation: pixelate,
  updateAnnotation: updatePixelate,
  t,
}) => {
  const { pixelateIntensity = 10 } = pixelate;

  const updatePixelateIntensity = (newIntensity) => {
    updatePixelate({
      pixelateIntensity: restrictNumber(newIntensity, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>{t('pixelateIntensity')}</Label>
      <Slider
        annotation="px"
        onChange={updatePixelateIntensity}
        value={pixelateIntensity}
        min={MIN_VALUE}
        max={MAX_VALUE}
        noMargin
      />
    </StyledSpacedOptionFields>
  );
};

PixelateIntensityField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PixelateIntensityField;
