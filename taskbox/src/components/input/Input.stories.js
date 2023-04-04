
import React from 'react';

import Input from './Input';

export default {
  component: Input,
  title: 'Input',
};

const Template = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'outlined',
  label: 'Outlined',
  variant: 'outlined',
};

export const Pinned = Template.bind({});
Pinned.args = {
  id: 'filled',
  label: 'Filled',
  variant: 'filled',
};

export const Archived = Template.bind({});
Archived.args = {
  id: 'standard',
  label: 'Standard',
  variant: 'standard',
};