import React from 'react';
import EthOverview from './eth-overview';

const Template = (args) => <EthOverview {...args} />;

export default {
  title: 'Components/App/WalletOverview/EthOverview',
  component: EthOverview,
  parameters: {
    docs: { description: { component: 'A component that displays an overview of Ethereum wallet information.' } }
  }
};

export const Default = Template.bind({});
