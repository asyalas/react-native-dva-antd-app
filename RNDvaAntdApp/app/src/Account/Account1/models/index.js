function initCallback(cb) {
  if (cb && typeof cb === 'function') {
    cb()
  }
}
export default {
  namespace: 'Account1',
  state: {
    data: '',
  },
  subscriptions: {},
  effects: {
    *getAccount({ payload: params }, { call, select, put }) {
      try {
        yield put({
          type: 'getAccount',
          payload: 'hello Account1',
        })
      } catch (e) {
        throw new SystemError(e)
      }
    },
  },
  reducers: {
    getAccount(state, { payload: data }) {
      return {
        ...state,
        data,
      }
    },
  },
}
