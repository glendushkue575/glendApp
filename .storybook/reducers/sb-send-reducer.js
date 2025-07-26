const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'send/updateSendStage':
      return { ...state, stage: action.payload };
    case 'send/updateSendAsset':
      return { ...state, asset: { ...state.asset, type: action.payload } };
    default: return state;
  }
}
