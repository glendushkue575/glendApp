import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonVariant, ButtonIcon, IconName } from '../../../component-library';

export default class NewAccountModal extends Component {
  static contextTypes = { t: PropTypes.func };
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    newAccountNumber: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = { alias: this.context.t('newAccountNumberName', [this.props.newAccountNumber]) };

  onChange = ({ target }) => this.setState({ alias: target.value });
  onSubmit = () => this.props.onSave(this.state.alias).then(this.props.hideModal);
  onKeyPress = ({ key }) => key === 'Enter' && this.state.alias && this.onSubmit();

  render() {
    const { t } = this.context;

    return (
      <div className="new-account-modal">
        <div className="new-account-modal__content">
          <div className="new-account-modal__content__header">
            {t('newAccount')}
            <ButtonIcon
              className="new-account-modal__content__header-close"
              ariaLabel={t('close')}
              onClick={this.props.hideModal}
              iconName={IconName.Close}
            />
          </div>
          <div className="new-account-modal__input-label">{t('accountName')}</div>
          <input
            type="text"
            className="new-account-modal__input"
            autoFocus
            value={this.state.alias}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div className="new-account-modal__footer">
          <Button variant={ButtonVariant.Secondary} block onClick={this.props.hideModal}>{t('cancel')}</Button>
          <Button variant={ButtonVariant.Primary} block disabled={!this.state.alias} onClick={()=>{}}>{t('save')}</Button>
        </div>
      </ div >
    );
   }
}
