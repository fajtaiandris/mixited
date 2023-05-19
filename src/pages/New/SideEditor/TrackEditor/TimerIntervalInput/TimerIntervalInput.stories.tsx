// eslint-disable-next-line import/named
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TimerIntervalInput } from './TimerIntervalInput';

export default {
  title: 'UI/TimerIntervalInput',
  component: TimerIntervalInput,
} as ComponentMeta<typeof TimerIntervalInput>;

const Template: ComponentStory<typeof TimerIntervalInput> = (args) => <TimerIntervalInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  startSec: 10,
  endSec: 100,
  length: 200,
  isInEdit: true,
  onUpdate: ({ startSec, endSec }) =>
    console.log(`TimerIntervalInput | emited values: [startSec: ${startSec}, endSec: ${endSec}]`),
};
