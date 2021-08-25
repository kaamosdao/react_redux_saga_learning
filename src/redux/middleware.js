import { showAlert } from './actions';
import { CREATE_POST } from './types';

const forbiddenWords = ['fuck', 'php', 42, 4815162342, '4 8 15 16 23 42'];

const forbiddenWordsMiddleware = (store) => (next) => (action) => {
  if (action.type === CREATE_POST) {
    const found = forbiddenWords.filter((word) => action.payload.title.includes(word));
    if (found.length) {
      return store.dispatch(
        showAlert('Seems like you are trying to use inappropriate word')
      );
    }
  }
  return next(action);
};

export default forbiddenWordsMiddleware;
