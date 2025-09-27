/** External Dependencies */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Rect, Image } from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const PixelateNode = ({
  id,
  name,
  x,
  y,
  width = 0,
  height = 0,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  annotationEvents,
  stroke = '#ff0000',
  strokeWidth = 2,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  shadowBlur = 0,
  shadowColor = '#000000',
  shadowOpacity = 1,
  opacity = 1,
  pixelateIntensity = 10,
  ...otherProps
}) => {
  const [pixelatedCanvas, setPixelatedCanvas] = useState(null);
  const rectRef = useRef();

  useEffect(() => {
    if (width <= 0 || height <= 0) return;

    const rect = rectRef.current;
    if (!rect) return;

    const stage = rect.getStage();
    if (!stage) return;

    // Get the image layer
    const imageLayer = stage.findOne('.image-layer');
    if (!imageLayer) return;

    // Get the image node
    const imageNode = imageLayer.findOne('Image');
    if (!imageNode) return;

    // Get the original image
    const originalImage = imageNode.image();
    if (!originalImage) return;

    // Create a canvas to apply pixelation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match the rectangle area
    const rectWidth = Math.abs(width * scaleX);
    const rectHeight = Math.abs(height * scaleY);
    canvas.width = rectWidth;
    canvas.height = rectHeight;

    // Draw the original image portion to the canvas
    ctx.drawImage(
      originalImage,
      x, y, rectWidth, rectHeight,  // source rectangle
      0, 0, rectWidth, rectHeight  // destination rectangle
    );

    // Get image data and apply pixelation
    const imageData = ctx.getImageData(0, 0, rectWidth, rectHeight);
    const pixelatedImageData = applyPixelation(imageData, pixelateIntensity);
    ctx.putImageData(pixelatedImageData, 0, 0);

    // Set the pixelated canvas
    setPixelatedCanvas(canvas);
  }, [x, y, width, height, scaleX, scaleY, pixelateIntensity]);

  // Function to apply pixelation effect
  const applyPixelation = (imageData, intensity) => {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const pixelSize = Math.max(1, Math.floor(intensity));
    
    const pixelatedData = new ImageData(width, height);
    const pixelatedPixels = pixelatedData.data;

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        // Calculate average color for this pixel block
        let r = 0, g = 0, b = 0, a = 0;
        let count = 0;

        for (let py = 0; py < pixelSize && y + py < height; py++) {
          for (let px = 0; px < pixelSize && x + px < width; px++) {
            const index = ((y + py) * width + (x + px)) * 4;
            r += pixels[index];
            g += pixels[index + 1];
            b += pixels[index + 2];
            a += pixels[index + 3];
            count++;
          }
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        a = Math.floor(a / count);

        // Apply the average color to all pixels in this block
        for (let py = 0; py < pixelSize && y + py < height; py++) {
          for (let px = 0; px < pixelSize && x + px < width; px++) {
            const index = ((y + py) * width + (x + px)) * 4;
            pixelatedPixels[index] = r;
            pixelatedPixels[index + 1] = g;
            pixelatedPixels[index + 2] = b;
            pixelatedPixels[index + 3] = a;
          }
        }
      }
    }

    return pixelatedData;
  };

  return (
    <>
      {/* The pixelated image overlay */}
      {pixelatedCanvas && (
        <Image
          image={pixelatedCanvas}
          x={x}
          y={y}
          width={width}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
          rotation={rotation}
          opacity={opacity}
          listening={false}
        />
      )}
      {/* The selection rectangle */}
      <Rect
        ref={rectRef}
        id={id}
        name={name}
        rotation={rotation}
        scaleX={scaleX}
        scaleY={scaleY}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowOffsetX={shadowOffsetX}
        shadowOffsetY={shadowOffsetY}
        shadowBlur={shadowBlur}
        shadowColor={shadowColor}
        shadowOpacity={shadowOpacity}
        fill="transparent"
        x={x}
        y={y}
        width={width}
        height={height}
        opacity={opacity}
        {...annotationEvents}
        {...otherProps}
      />
    </>
  );
};

PixelateNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  pixelateIntensity: PropTypes.number,
};

export default PixelateNode;