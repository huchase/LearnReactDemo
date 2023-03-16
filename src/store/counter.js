import { createStore, applyMiddleware } from 'redux';
import thunkMid from 'react-thunk';
import cr from '../reducer/counter';

const tmp = applyMiddleware(thunkMid);

export default createStore(cr, tmp);
