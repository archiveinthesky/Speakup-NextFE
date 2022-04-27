import { atom } from 'recoil';

const boardDataState = atom({ key: 'boardData', default: {} });

const cmtRepliesState = atom({ key: 'cmtReplies', default: [] });

export { boardDataState, cmtRepliesState };
