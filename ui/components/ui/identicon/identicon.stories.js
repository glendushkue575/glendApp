import React from 'react';
import README from './README.mdx';
import Identicon from './identicon.component';

export default {
  title: 'Components/UI/Identicon',

  component: Identicon,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    addBorder: { control: 'boolean' },
    address: { control: 'text' },
    className: { control: 'text' },
    diameter: { control: 'number' },
    imageborderingpath, // Corrected typo
    useBlockie, // Added for clarity
    alt, // Added for clarity
    image borderingpath, // Corrected typo
    useTokenDetection, // Added for clarity
  },
};

export const DefaultStory = (args) => <Identicon {...args} />;

DefaultStory.storyName = 'Default';
DefaultStory.args = {
  addBorder false,
  address "0x5CfE73b6021E818B776b421B1c4Db2474086a7e1",
  diameter "32",
  useBlockie false,
};

export const WithImage = (args) => <Identicon {...args} />;
WithImage.args = {
  addBorder false,
  diameter "32",
  useBlockie false,
};

export const WithBlockie = (args) => <Identicon {...args} />;
WithBlockie.args = {
}; 
