# Storybook Addon Story Description

The Story Description addon brings your documentation out of the Docs page and directly into the Canvas UI. It surfaces your component and story descriptions in both a convenient toolbar popover and a persistent addon panel, ensuring developers always have context right where they are interacting with the UI.

## Getting Started

Install this addon by adding `storybook-addon-story-description` to your dependencies:

```sh
npm install -D storybook-addon-story-description
# or
yarn add -D storybook-addon-story-description
# or
pnpm add -D storybook-addon-story-description

```

Register the addon within your `.storybook/main.js` (or `.ts`) file:

```js
export default {
  addons: ['storybook-addon-story-description'],
};
```

## Usage

This addon automatically hooks into Storybook's existing `docs` parameters. You don't need to learn a new API or maintain duplicate data. Just write your documentation where you normally would for Storybook's autodocs feature.

Define your component-level and story-level descriptions in your story file using `parameters.docs.description`:

```js
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        // This component-level description acts as the global fallback
        component:
          'The Button component is the primary UI element for user interaction. It supports multiple sizes and variants.',
      },
    },
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        // This story-level description overrides the component description
        story: 'Use the Primary variant strictly for the main call-to-action on a page.',
      },
    },
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
  },
  // Because no story description is provided here,
  // the addon will automatically fall back to displaying the component description!
};
```

## Features

### Smart Fallback Logic

The addon runs a pure fallback utility to determine what to display. If you are viewing a specific story (like `Primary`) that has a `story` description, it displays that. If the story lacks one (like `Secondary`), it seamlessly falls back to the broader `component` description.

### Toolbar Popover

Click the info icon (`InfoIcon`) in the Canvas toolbar to instantly view the active story's description in a cleanly styled popover.

### Addon Panel

If you prefer your documentation permanently visible while you tweak controls, open the "Story Description" tab in the bottom addons panel. It reacts dynamically as you switch between stories.
