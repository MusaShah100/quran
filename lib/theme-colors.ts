// Theme Colors Configuration
// Change colors here to update throughout the entire website

export const themeColors = {
  // Primary brand colors - main learning theme
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },
  
  // Secondary colors - warm accent for engagement
  secondary: {
    50: '#fef7ee',
    100: '#fdedd3',
    200: '#fbd7a5',
    300: '#f8bc6d',
    400: '#f59832',
    500: '#f37b1a', // Main secondary
    600: '#e45d0f',
    700: '#bd450f',
    800: '#973714',
    900: '#7a2e13',
    950: '#431507'
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