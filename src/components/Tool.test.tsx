// @vitest-environment happy-dom
/// <reference types="@testing-library/jest-dom" />
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

import { useStorybookState } from 'storybook/manager-api';
import { Tool } from './Tool';

vi.mock('storybook/manager-api', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useStorybookState: vi.fn(),
  };
});

vi.mock('storybook/internal/components', () => {
  return {
    WithTooltip: ({ children }: any) => <div data-testid="tooltip-wrapper">{children}</div>,
    ToggleButton: (props: any) => (
      <button aria-label={props.ariaLabel} title={props.title}>
        MockButton
      </button>
    ),
  };
});

vi.mock('storybook/theming', () => ({
  styled: {
    div: () => (props: any) => <div {...props} />,
  },
}));

const mockUseStorybookState = vi.mocked(useStorybookState);
const mockApi = { getData: vi.fn() } as any;

describe('Tool', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render nothing if the viewMode is not story', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'docs', storyId: '1' } as any);

    const { container } = render(<Tool api={mockApi} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if the story has no description', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'story', storyId: '1' } as any);
    mockApi.getData.mockReturnValue({ type: 'story', parameters: {} });

    const { container } = render(<Tool api={mockApi} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render the toggle button when a description exists', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'story', storyId: '1' } as any);
    mockApi.getData.mockReturnValue({
      type: 'story',
      parameters: { docs: { description: { story: 'Valid description' } } },
    });

    render(<Tool api={mockApi} />);

    expect(screen.getByLabelText('View Story Description')).toBeTruthy();
  });
});
