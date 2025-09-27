/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { CropLandscape as PixelateIcon } from '@scaleflex/icons/crop-landscape';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PixelateButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_pixelate-tool-button"
    id={TOOLS_IDS.PIXELATE}
    label={t('pixelateTool')}
    Icon={PixelateIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

PixelateButton.defaultProps = {
  isSelected: false,
};

PixelateButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default PixelateButton;
