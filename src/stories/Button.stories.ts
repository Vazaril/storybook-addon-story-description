import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'This is the global component description. It will appear in your addon tooltip and panel for any story that does not provide its own specific description.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This is a specific story description! When you view the Primary story, this text overrides the component-level description in your new addon.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
  },
};
