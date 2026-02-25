// Theme Colors Configuration
// Change colors here to update throughout the entire website

export const themeColors = {
  // Primary brand colors - main learning theme
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Main primary (teal matching logo green)
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e'
  },
  
  // Secondary colors - warm accent for engagement
  secondary: {
    50: '#FFF9E6',
    100: '#FFF2CC',
    200: '#FFE699',
    300: '#FFD966',
    400: '#FFCD33',
    500: '#C9A227', // Main secondary (gold accent matching keys)
    600: '#B38F1E',
    700: '#8C6E14',
    800: '#73590F',
    900: '#5C470B',
    950: '#3A2E06'
  },
  
  // Success colors - for achievements and progress
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },
  
  // Warning colors - for attention and alerts
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },
  
  // Error colors - for errors and validation
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },
  
  // Neutral colors - for text and backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  },
  
  // Tajweed colors - authentic Islamic learning colors
  tajweed: {
    ghunnah: '#10b981',     // Green for nasal sounds
    idgham: '#3b82f6',      // Blue for merging
    iqlab: '#8b5cf6',       // Purple for changing
    qalqalah: '#f59e0b',    // Orange for echo sounds
    madd: '#ef4444',        // Red for elongation
    ikhfa: '#06b6d4',       // Cyan for hiding
    safir: '#84cc16',       // Lime for whistling
    qalb: '#ec4899',        // Pink for heart letters
  }
};

// CSS Variables generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  Object.entries(themeColors).forEach(([colorName, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        cssVars[`--color-${colorName}-${shade}`] = value;
      });
    }
  });
  
  return cssVars;
};

// Tailwind color configuration
export const tailwindColors = {
  primary: {
    DEFAULT: themeColors.primary[500],
    ...themeColors.primary
  },
  secondary: {
    DEFAULT: themeColors.secondary[500],
    ...themeColors.secondary
  },
  success: {
    DEFAULT: themeColors.success[500],
    ...themeColors.success
  },
  warning: {
    DEFAULT: themeColors.warning[500],
    ...themeColors.warning
  },
  error: {
    DEFAULT: themeColors.error[500],
    ...themeColors.error
  },
  neutral: {
    DEFAULT: themeColors.neutral[500],
    ...themeColors.neutral
  },
  tajweed: themeColors.tajweed
};
