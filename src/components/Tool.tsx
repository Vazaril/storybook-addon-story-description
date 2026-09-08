import React, { memo, useState } from 'react';
import { useStorybookState, type API } from 'storybook/manager-api';
import { ToggleButton, WithTooltip } from 'storybook/internal/components';
import { InfoIcon } from '@storybook/icons';
import { TOOL_ID } from '../constants';
import { styled } from 'storybook/theming';

const PopoverContainer = styled.div(({ theme }) => ({
  padding: '16px',
  maxWidth: '350px',
  fontSize: '13px',
  lineHeight: '1.5',
  color: theme.color.defaultText,
  background: theme.background.content,
}));

const PopoverTitle = styled.div(({ theme }) => ({
  fontWeight: theme.typography.weight.bold,
  marginBottom: '8px',
  borderBottom: `1px solid ${theme.appBorderColor}`,
  paddingBottom: '4px',
}));

export const Tool = memo(function DescriptionTool({ api }: { api: API }) {
  const { storyId, viewMode } = useStorybookState();
  const [isOpen, setIsOpen] = useState(false);

  if (viewMode !== 'story' || !storyId) {
    return null;
  }

  const storyData = api.getData(storyId);
  if (!storyData || storyData.type !== 'story') {
    return null;
  }

  const description =
    storyData.parameters?.docs?.description?.story || storyData.parameters?.docs?.description?.component;

  if (!description) {
    return null;
  }

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      onVisibleChange={setIsOpen}
      tooltip={
        <PopoverContainer>
          <PopoverTitle>Story Description</PopoverTitle>
          <div>{description}</div>
        </PopoverContainer>
      }
    >
      <ToggleButton
        key={TOOL_ID}
        padding="small"
        variant="ghost"
        pressed={isOpen}
        ariaLabel="View Story Description"
      >
        <InfoIcon />
      </ToggleButton>
    </WithTooltip>
  );
});
