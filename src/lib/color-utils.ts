/**
 * Color Utilities for Colora Fabric Matcher
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface LAB {
  l: number;
  a: number;
  b: number;
}

/**
 * Converts HEX string to RGB object
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Converts RGB to HEX string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Converts RGB to LAB color space for better perceptual comparison
 * Using D65 illuminant
 */
export function rgbToLab(rgb: RGB): LAB {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  // Observer. = 2°, Illuminant = D65
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  let xr = x / 95.047;
  let yr = y / 100.00;
  let zr = z / 108.883;

  xr = xr > 0.008856 ? Math.pow(xr, 1/3) : (7.787 * xr) + (16 / 116);
  yr = yr > 0.008856 ? Math.pow(yr, 1/3) : (7.787 * yr) + (16 / 116);
  zr = zr > 0.008856 ? Math.pow(zr, 1/3) : (7.787 * zr) + (16 / 116);

  return {
    l: (116 * yr) - 16,
    a: 500 * (xr - yr),
    b: 200 * (yr - zr)
  };
}

/**
 * Calculates the Delta E distance between two colors in LAB space (CIE76)
 */
export function calculateDeltaE(lab1: LAB, lab2: LAB): number {
  const dl = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Math.sqrt(dl * dl + da * da + db * db);
}

/**
 * Converts Delta E to a match percentage (0-100)
 * Delta E of 0 is 100% match. Delta E of 100 is 0% match.
 * Typically results > 15 are very different.
 */
export function deltaEToPercentage(deltaE: number): number {
  // We'll normalize so that Delta E of 50 is essentially 0% match for UI purposes
  // Most "good" matches are Delta E < 5.
  const score = Math.max(0, 100 - (deltaE * 2)); 
  return Math.round(score);
}

/**
 * Extracts dominant color from an image URI (using canvas)
 */
export async function extractDominantColor(imageUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUri;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Could not get canvas context');

      // Resize for performance
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      const imageData = ctx.getImageData(0, 0, 100, 100).data;
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        // Simple average for speed, ignoring transparency
        r += imageData[i];
        g += imageData[i+1];
        b += imageData[i+2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      resolve(rgbToHex(r, g, b));
    };

    img.onerror = (e) => reject(e);
  });
}
