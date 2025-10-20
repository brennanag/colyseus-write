t's quite straightforward to retheme your site with Chakra UI, and integrating Tiptap is a great next step. I'll walk you through both processes.
🎨 Retheming Your Chakra UI Site

Theming in Chakra UI is centralized in a configuration file, making it easy to maintain and update your site's appearance consistently.

Here's how to set up and customize your theme:

    Create or Locate Your Theme File: Create a new file, for example theme.ts, in your project (a common location is within a src/theme/ or lib/ directory).

    Define Your Custom Theme: Use Chakra UI's defineConfig and createSystem functions to build your custom theme. This is where you'll define your color palette, fonts, breakpoints, and more

.
typescript

// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
theme: {
tokens: {
colors: {
// Define your custom color tokens
brand: {
100: { value: "#e0f2fe" },
500: { value: "tomato" }, // Your primary brand color
900: { value: "#0c4a6e" },
},
},
fonts: {
heading: { value: "var(--font-geist-sans)" },
body: { value: "var(--font-geist-mono)" },
},
},
semanticTokens: {
colors: {
// Create semantic meanings for your colors
"bg-surface": {
value: { base: "{colors.white}", \_dark: "{colors.gray.800}" },
},
},
},
},
globalCss: {
// Apply global styles
"html, body": {
margin: 0,
padding: 0,
},
"\*::selection": {
bg: "brand.100", // Use your brand color
},
},
});

export const system = createSystem(defaultConfig, customConfig);

Update Your Provider: Replace the default system in your ChakraProvider with your custom one. This is typically done in your root layout (app/layout.tsx) or a separate provider component

.
typescript

// In your layout.tsx or provider component
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme"; // Path to your theme file

export function Provider({ children }: { children: React.ReactNode }) {
return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

Generate Type Definitions (Optional): For full type safety, run the Chakra UI CLI to sync your custom theme with TypeScript

.
bash

npx @chakra-ui/cli typegen ./theme.ts
