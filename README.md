# MugFace

MugFace is a lightweight, highly customizable SVG-based avatar/emoji generator built with React. It deterministically generates adorable avatars with various colors, shapes, eyes, mouths, and cheeks based on a provided `name` string (using a hashing algorithm).

Inspired by [FaceHash](https://github.com/cossistantcom/cossistant/tree/main/packages/facehash).

## Features

- 🎨 **SVG-Based Rendering**: Lightweight, zero extra dependencies, and infinitely scalable without losing quality.
- 🔄 **Deterministic Generation**: Uses a hashing algorithm based on the `name` prop. The same `name` combined with the same `seed` will always generate the exact same appearance.
- ✨ **Built-in Animations**: Comes with smooth CSS animations like floating and blinking, bringing the avatars to life.
- 🎭 **Emotion Control**: Besides random generation, it supports forcing specific emotional states (e.g., `happy`, `sad`, `neutral`, `anxious`).
- 🛠 **Highly Customizable**: Built on `React.FC<React.SVGProps<SVGSVGElement>>`, it accepts all standard SVG element attributes (such as `width`, `height`, `className`, `style`, etc.).

## Installation

```bash
npm install mugface
# or
yarn add mugface
# or
pnpm add mugface
```

## Usage

Simply import `MugFace` in your React project and provide the required `name` prop:

```tsx
import React from 'react';
import { MugFace } from 'mugface';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Basic usage: just provide a name */}
      <MugFace name="Alice" width="100" height="100" />

      {/* Advanced usage: custom props and forced emotion */}
      <MugFace 
        name="Bob" 
        seed={42} 
        emotion="happy" 
        animate={true} 
        borderRadius={20}
        width="100"
        height="100"
      />
    </div>
  );
}

export default App;
```

## Props

In addition to standard `React.SVGProps<SVGSVGElement>` attributes, the `MugFace` component accepts the following props:

| Prop | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | `string` | - | **Yes** | A string used to generate a hash for the avatar's features, determining the specific combination of colors, eyes, mouth, shape, etc. |
| `seed` | `number` | `0` | No | A random seed for the hash calculation. Changing the `seed` allows the same `name` to generate a completely different appearance. |
| `animate` | `boolean` | `true` | No | Whether to enable built-in SVG animations (floating effect, blinking, and other component-specific CSS animations). |
| `emotion` | `'neutral' \| 'happy' \| 'sad' \| 'anxious'` | `undefined` | No | Forces a specific emotional state. If not provided, eyes and mouth styles are randomly assigned based on the hash. If provided, eyes and mouth are randomly selected only from the corresponding emotion's pool. |
| `borderRadius` | `number` | `undefined` | No | Explicitly overrides the border radius of the background shape. If not provided, the shape and border radius are generated based on the hash, creating different styles. |

## Internal Design Mechanism

MugFace maintains several preset design features internally:
- **Eyes (EYES)**: 8 different eye shapes and specific animations.
- **Mouths (MOUTHS)**: 7 different mouth expressions.
- **Cheeks (CHEEKS)**: Various blush styles for cheeks.
- **Background Shapes (SHAPES)**: Circles, rectangles with varying border radii, teardrop shapes, etc.
- **Palettes (PALETTES)**: 10 sets of highly harmonious pre-mixed theme colors (including background color `bg` and foreground/stroke color `fg`).

During each component render, the `name` and `seed` are converted into an integer using a fast custom hashing function. This integer is then bit-shifted and modulo-operated against the lengths of the feature pool arrays to obtain the corresponding feature indices, rapidly and seamlessly assembling millions of unique combinations.




