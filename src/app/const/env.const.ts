const env = (window as any).env || process.env;

export const BASE_DOMAIN = env.REACT_APP_BASE_DOMAIN;
export const AUTH_API = env.REACT_APP_AUTH_API;
export const DAE_API = env.REACT_APP_DAE_API;
export const DAE_API_MOCK = env.REACT_APP_DAE_API_MOCK;
export const MASTER_API = env.REACT_APP_MASTER_API;
export const MASTER_MOCK_API = env.REACT_APP_MASTER_MOCK_API;
export const REC_API = env.REACT_APP_REC_API;
export const REC_MOCK_API = env.REACT_APP_REC_MOCK_API;
export const ADM_API = env.REACT_APP_ADM_API;
export const ADM_MOCK_API = env.REACT_APP_ADM_MOCK_API;
export const USP_API = env.REACT_APP_USP_API;
export const USP_MOCK_API = env.REACT_APP_USP_MOCK_API;
export const CHATBOT_API = env.REACT_APP_CHATBOT_API;
export const COM_MOCK_API = env.REACT_APP_COM_MOCK_API;
export const MIM_API = env.REACT_APP_MIM_API;
export const PERM_API = env.REACT_APP_PERM_API;
export const E_ACCESS_API = env.REACT_APP_E_ACCESS_API;

export const CHECKSUM_HEADER = 'hash';
export const USE_DUMMY_LOGIN = !!env.REACT_APP_USE_DUMMY_LOGIN;
export const RECOVERY_PREV_PATH = 'prev_path';
