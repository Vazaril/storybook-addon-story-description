import React, { memo } from 'react';
import { useStorybookState, type API } from 'storybook/manager-api';
import { IconButton, TooltipNote, WithTooltip } from 'storybook/internal/components';
import { InfoIcon } from '@storybook/icons';
import { TOOL_ID } from '../constants';

export const Tool = memo(function DescriptionTool({ api }: { api: API }) {
  const { storyId, viewMode } = useStorybookState();

  if (viewMode !== 'story' || !storyId) {
    return null;
  }

  const storyData = api.getData(storyId);
  if (!storyData || storyData.type !== 'story') {
    return null;
  }

  const storyDesc = storyData.parameters?.docs?.description?.story;
  const componentDesc = storyData.parameters?.docs?.description?.component;
  const description = storyDesc || componentDesc;

  if (!description) {
    return null;
  }

  return (
    <WithTooltip placement="bottom" trigger="click" tooltip={<TooltipNote note={description} />}>
      <IconButton key={TOOL_ID} title="Show Story Description">
        <InfoIcon />
      </IconButton>
    </WithTooltip>
  );
});
