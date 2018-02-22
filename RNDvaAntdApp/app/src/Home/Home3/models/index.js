function initCallback(cb) {
  if (cb && typeof cb === 'function') {
    cb()
  }
}
export default {
  namespace: 'Home3',
  state: {
    data: '',
  },
  subscriptions: {},
  effects: {
    *getHome({ payload: params }, { call, select, put }) {
      try {
        yield put({
          type: 'getHome',
          payload: 'hello Home3',
        })
      } catch (e) {
        throw new SystemError(e)
      }
    },
  },
  reducers: {
    getHome(state, { payload: data }) {
      return {
        ...state,
        data,
      }
    },
  },
}
