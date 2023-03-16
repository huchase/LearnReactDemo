const initValue = {
  num: 0,
};
// eslint-disable-next-line default-param-last
export default function counterReducer(state = initValue, action) {
  switch (action.type) {
    case 'count/inc':
      return { num: state.num + 1 };
    case 'count/dec':
      return { num: state.num - 1 };
    default:
      return state;
  }
}
