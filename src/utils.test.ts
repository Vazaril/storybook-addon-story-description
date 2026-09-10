import { describe, it, expect } from 'vitest';
import { getDescription } from './utils';

describe('getDescription', () => {
  it('returns the story description when both are provided', () => {
    const data = {
      type: 'story',
      parameters: {
        docs: { description: { story: 'Story text', component: 'Component text' } },
      },
    };
    expect(getDescription(data)).toBe('Story text');
  });

  it('falls back to the component description when story description is missing', () => {
    const data = {
      type: 'story',
      parameters: {
        docs: { description: { component: 'Component text' } },
      },
    };
    expect(getDescription(data)).toBe('Component text');
  });

  it('returns undefined when neither description exists', () => {
    const data = { type: 'story', parameters: {} };
    expect(getDescription(data)).toBeUndefined();
  });

  it('returns undefined if data is not a story', () => {
    const data = { type: 'docs', parameters: { docs: { description: { component: 'text' } } } };
    expect(getDescription(data)).toBeUndefined();
  });
});
