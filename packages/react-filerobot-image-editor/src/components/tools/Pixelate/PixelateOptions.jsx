/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import {
  pixelateOptionsPopupComponents,
  PIXELATE_POPPABLE_OPTIONS,
} from './Pixelate.constants';

const PixelateOptions = ({ t }) => {
  const [pixelate, savePixelate] = useAnnotation({
    name: TOOLS_IDS.PIXELATE,
  });

  return (
    <AnnotationOptions
      className="FIE_pixelate-tool-options"
      moreOptionsPopupComponentsObj={pixelateOptionsPopupComponents}
      morePoppableOptionsPrepended={PIXELATE_POPPABLE_OPTIONS}
      annotation={pixelate}
      updateAnnotation={savePixelate}
      t={t}
    />
  );
};

PixelateOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default PixelateOptions;
