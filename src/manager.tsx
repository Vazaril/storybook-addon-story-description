import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { Tool } from './components/Tool';
import { Panel } from './components/Panel';
import { ADDON_ID, TOOL_ID } from './constants';

const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Story Description Tool',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <Tool api={api} />,
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Description',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => <Panel active={!!active} api={api} />,
  });
});
