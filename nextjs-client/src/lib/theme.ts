// lib/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";

// Define your custom theme configuration
export const system = createSystem(defaultConfig, {
  theme: {
    // 1. Define raw color tokens
    tokens: {
      colors: {
        // Gray palette
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#f4f4f5" },
          200: { value: "#e4e4e7" },
          300: { value: "#d4d4d8" },
          400: { value: "#a1a1aa" },
          500: { value: "#71717a" },
          600: { value: "#52525b" },
          700: { value: "#3f3f46" },
          800: { value: "#27272a" },
          900: { value: "#18181b" },
          950: { value: "#111111" },
        },
        // Blue palette
        blue: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#a3cfff" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#173da6" },
          800: { value: "#1a3478" },
          900: { value: "#14204a" },
          950: { value: "#0c142e" },
        },
        // Green palette
        green: {
          50: { value: "#f0fdf4" },
          100: { value: "#dcfce7" },
          200: { value: "#bbf7d0" },
          300: { value: "#86efac" },
          400: { value: "#4ade80" },
          500: { value: "#22c55e" },
          600: { value: "#16a34a" },
          700: { value: "#116932" },
          800: { value: "#124a28" },
          900: { value: "#042713" },
          950: { value: "#03190c" },
        },
        // Purple palette
        purple: {
          50: { value: "#faf5ff" },
          100: { value: "#f3e8ff" },
          200: { value: "#e9d5ff" },
          300: { value: "#d8b4fe" },
          400: { value: "#c084fc" },
          500: { value: "#a855f7" },
          600: { value: "#9333ea" },
          700: { value: "#641ba3" },
          800: { value: "#4a1772" },
          900: { value: "#2f0553" },
          950: { value: "#1a032e" },
        },
        // Orange palette
        orange: {
          50: { value: "#fff7ed" },
          100: { value: "#ffedd5" },
          200: { value: "#fed7aa" },
          300: { value: "#fdba74" },
          400: { value: "#fb923c" },
          500: { value: "#f97316" },
          600: { value: "#ea580c" },
          700: { value: "#92310a" },
          800: { value: "#6c2710" },
          900: { value: "#3b1106" },
          950: { value: "#220a04" },
        },
        // Red palette
        red: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#ef4444" },
          600: { value: "#dc2626" },
          700: { value: "#991919" },
          800: { value: "#511111" },
          900: { value: "#300c0c" },
          950: { value: "#1f0808" },
        },
      },
    },
    // 2. Map tokens to semantic use-cases for light/dark modes :cite[7]
    semanticTokens: {
      colors: {
        // Background colors
        "bg.page": {
          value: { _light: "white", _dark: "{colors.gray.950}" },
        },
        "bg.card": {
          value: { _light: "white", _dark: "{colors.gray.800}" },
        },
        "bg.highlight": {
          value: { _light: "{colors.blue.50}", _dark: "{colors.blue.900}" },
        },
        "bg.subtle": {
          value: { _light: "{colors.gray.50}", _dark: "{colors.gray.700}" },
        },
        "bg.muted": {
          value: { _light: "{colors.gray.100}", _dark: "{colors.gray.900}" },
        },
        // Phase-specific backgrounds
        "bg.lobby": {
          value: { _light: "{colors.green.50}", _dark: "{colors.green.900}" },
        },
        "bg.writing": {
          value: { _light: "{colors.purple.50}", _dark: "{colors.purple.900}" },
        },
        "bg.reading": {
          value: { _light: "{colors.orange.50}", _dark: "{colors.orange.900}" },
        },
        // Text colors
        "text.main": {
          value: { _light: "{colors.gray.800}", _dark: "white" },
        },
        "text.subtle": {
          value: { _light: "{colors.gray.600}", _dark: "{colors.gray.300}" },
        },
        "text.highlight": {
          value: { _light: "{colors.blue.600}", _dark: "{colors.blue.400}" },
        },
        "text.success": {
          value: { _light: "{colors.green.600}", _dark: "{colors.green.300}" },
        },
        "text.error": {
          value: { _light: "{colors.red.600}", _dark: "{colors.red.300}" },
        },
        // Border colors
        "border.default": {
          value: { _light: "{colors.gray.200}", _dark: "{colors.gray.700}" },
        },
        "border.muted": {
          value: { _light: "{colors.gray.100}", _dark: "{colors.gray.800}" },
        },
        // Status colors
        "status.success": {
          value: { _light: "{colors.green.500}", _dark: "{colors.green.400}" },
        },
        "status.error": {
          value: { _light: "{colors.red.500}", _dark: "{colors.red.400}" },
        },
        "status.info": {
          value: { _light: "{colors.blue.500}", _dark: "{colors.blue.400}" },
        },
        styles: {
            global: {
              body: {
                bg: "{colors.bg.page}",
                color: "{colors.text.main}",
                fontFamily: "{fonts.body}",
                lineHeight: "1.5",
              },
            },
          },
        },
      });
