import React from 'react';
import { useStorybookState, type API } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { styled } from 'storybook/theming';

const PanelContent = styled.div(({ theme }) => ({
  padding: '16px',
  fontSize: '14px',
  lineHeight: '1.6',
  color: theme.color.defaultText,
}));

const EmptyState = styled.div(({ theme }) => ({
  color: theme.textMutedColor,
  fontStyle: 'italic',
}));

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

  const description =
    storyData.parameters?.docs?.description?.story || storyData.parameters?.docs?.description?.component;

  return (
    <AddonPanel active={active}>
      <PanelContent>
        {description ? <div>{description}</div> : <EmptyState>No description provided for this story.</EmptyState>}
      </PanelContent>
    </AddonPanel>
  );
};
