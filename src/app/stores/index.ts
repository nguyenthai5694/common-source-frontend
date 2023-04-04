import { StoreManager } from 'app/services/redux';
import loggedInUserStore from 'app/stores/loggedInUser';

const rootStores = [
  loggedInUserStore,
];

export default StoreManager.initStore(rootStores);