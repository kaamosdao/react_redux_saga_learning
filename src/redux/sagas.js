import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchPosts, hideLoader, showAlert, showLoader } from './actions';
import { REQUEST_POSTS } from './types';

const makeRequest = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  return await response.json();
};

function* sagaWorker(action) {
  try {
    yield put(showLoader());
    const payload = yield call(makeRequest);
    yield put(fetchPosts(payload));
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    yield put(showAlert('Something went wrong'));
  }
}

function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

export default sagaWatcher;
