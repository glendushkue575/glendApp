import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { IconName } from '../icon';
import { IconColor } from '../../../helpers/constants/design-system';
import { Tag } from './tag';
import README from './README.mdx';

export default {
  title: 'Components/ComponentLibrary/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    label: { control: 'text' },
    startIconName: { control: 'text' },
  },
  args: {
    label: 'Imported',
  },
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Default';

export const Label = Template.bind({});
Label.args = { label: 'Label Story' };

export const StartIconNameStory = Template.bind({});
StartIconNameStory.args = {
  label: 'Snap Name',
  startIconName: IconName.Snaps,
};
StartIconNameStory.storyName = 'StartIconName';

export const StartIconPropsStory = Template.bind({});
StartIconPropsStory.args = {
  label: 'Snap Name',
  startIconName: IconName.Snaps,
  startIconProps:{ color : IconColor.primaryDefault }
};
StartIconPropsStory.storyName ='StartIconProps';
