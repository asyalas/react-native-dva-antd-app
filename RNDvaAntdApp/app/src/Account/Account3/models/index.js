function initCallback(cb) {
  if (cb && typeof cb === 'function') {
    cb()
  }
}
export default {
  namespace: 'Account3',
  state: {
    data: '',
  },
  subscriptions: {},
  effects: {
    *getAccount({ payload: params }, { call, select, put }) {
      try {
        yield put({
          type: 'getAccount',
          payload: 'hello Account3',
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
