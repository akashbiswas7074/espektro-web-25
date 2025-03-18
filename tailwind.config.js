/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const prefix = '';
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    fontFamily: {
      medieval: ["MedievalSharp", "cursive"],
      'merriweather': ['Merriweather', 'serif'],
      'nova-square': ['Nova Square', 'cursive'],
      'poppins': ['Poppins', 'sans-serif'],
      'saira': ['Saira Extra Condensed', 'sans-serif'],
      'unifraktur': ['UnifrakturCook', 'cursive'],
    },
    colors: {
      // Vintage color scheme
      vintage: {
        'brown-medium': '#8b6e4e',
        'brown-text': '#a98459',
        'brown': '#a38767',
        'parchment': '#e8dcc9',
        'brown-dark': '#5e4a33',
      },
      'text-light': '#ccc',
      'text-medium': '#999',
      'text-floral': '#f5f5f5',
      'text-dark': '#ec7a46',
      'text-primary': '#191825',
      border: 'transparent',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    backgroundColor: {
      'primary-custom': '#070707',
      'secondary-custom': '#4d4c7d',
      'action-custom': '#f99417',
    },
  },
};
export const plugins = [require('tailwindcss-animate')];
