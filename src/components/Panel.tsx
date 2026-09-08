import React from 'react';
import { useStorybookState, type API } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel = ({ active, api }: PanelProps) => {
  const { storyId, viewMode } = useStorybookState();

  if (!active || viewMode !== 'story' || !storyId) {
    return null;
  }

  const storyData = api.getData(storyId);
  if (!storyData || storyData.type !== 'story') {
    return null;
  }

  const storyDesc = storyData.parameters?.docs?.description?.story;
  const componentDesc = storyData.parameters?.docs?.description?.component;
  const description = storyDesc || componentDesc;

  return (
    <AddonPanel active={active}>
      <div style={{ padding: '16px', fontSize: '14px', lineHeight: '1.5' }}>
        {description ? (
          <div>{description}</div>
        ) : (
          <div style={{ color: '#666', fontStyle: 'italic' }}>No description provided for this story.</div>
        )}
      </div>
    </AddonPanel>
  );
};
