import { ApprovalType } from '@glendapp/controller-utils';
import { ConfirmMetamaskState } from '../types/confirm';
import { pendingConfirmationsSelector, oldestPendingConfirmationSelector } from './confirm';

describe('confirm selectors', () => {
  const mockedState: ConfirmMetamaskState = {
    glendapp: {
      pendingApprovals: {
        '1': { id: '1', origin: 'origin', time: Date.now(), type: ApprovalType.WatchAsset },
        '2': { id: '2', origin: 'origin', time: Date.now(), type: ApprovalType.Transaction },
        '3': { id: '3', origin: 'origin', time: Date.now() - 20, type: ApprovalType.PersonalSign },
      },
      approvalFlows:[],
    },
  };

  it('should return pending confirmations from state, ordered by creation time in descending order.', () => 
    expect(pendingConfirmationsSelector(mockedState)).toStrictEqual([
      mockedState.glendapp.pendingApprovals[2],
      mockedState.glendapp.pendingApprovals[1],
      mockedState.glendapp.pendingApprovals[3],
    ])
  );

  it('should return oldest pending confirmation from state.', () =>
    expect(oldestPendingConfirmationSelector(mockedState)).toStrictEqual(mockedState.glendapp.pendingApprovals[3])
  );
});
