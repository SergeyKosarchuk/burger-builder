import React from 'react';

import rootStore, { IRootStore } from '../store/store'

export default React.createContext<IRootStore>(rootStore);
