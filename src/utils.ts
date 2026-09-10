export interface StoryData {
  type?: string;
  parameters?: {
    docs?: {
      description?: {
        story?: string;
        component?: string;
      };
    };
  };
  [key: string]: unknown;
}

export function getDescription(storyData: StoryData | undefined | null): string | undefined {
  if (!storyData || storyData.type !== 'story') {
    return undefined;
  }

  const storyDesc = storyData.parameters?.docs?.description?.story;
  const componentDesc = storyData.parameters?.docs?.description?.component;

  return storyDesc || componentDesc;
}
