import { createStore, AnyAction } from 'redux';

export interface IState {
  data: string;
}

export interface IAction {
  type: string;
  payload: any;
}

const innitalState: IState = {
  data: '',
};

function reducer(state = innitalState, action: AnyAction) {
  switch (action.type) {
    case 'CHANGE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

// 客户端使用的Store
export function createClientStore() {
  // 客户端有一次初始化state，服务端也有一次初始化state
  // window.BACKEND_DATA是服务端取到的数据，将服务端的数据送给客户端
  return createStore(reducer, window.BACKEND_DATA!);
}

// 服务端使用的Store
export function createServerStore() {
  return createStore(reducer);
}
