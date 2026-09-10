// @vitest-environment happy-dom
/// <reference types="@testing-library/jest-dom" />
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import React from 'react';

import { useStorybookState } from 'storybook/manager-api';
import { ThemeProvider } from 'storybook/theming';
import { Panel } from './Panel';

vi.mock('storybook/manager-api');

const mockUseStorybookState = vi.mocked(useStorybookState);
const mockApi = { getData: vi.fn() } as any;

const mockTheme = {
  color: { defaultText: '#000' },
  textMutedColor: '#666',
} as any;

describe('Panel', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render nothing when not active', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'story', storyId: '1' } as any);

    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <Panel active={false} api={mockApi} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render the description when available', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'story', storyId: '1' } as any);
    mockApi.getData.mockReturnValue({
      type: 'story',
      parameters: { docs: { description: { component: 'Test component description' } } },
    });

    render(
      <ThemeProvider theme={mockTheme}>
        <Panel active={true} api={mockApi} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Test component description')).toBeTruthy();
  });

  it('should render the empty state when no description is provided', () => {
    mockUseStorybookState.mockReturnValue({ viewMode: 'story', storyId: '1' } as any);
    mockApi.getData.mockReturnValue({ type: 'story', parameters: {} });

    render(
      <ThemeProvider theme={mockTheme}>
        <Panel active={true} api={mockApi} />
      </ThemeProvider>,
    );
    expect(screen.getByText('No description provided for this story.')).toBeTruthy();
  });
});
