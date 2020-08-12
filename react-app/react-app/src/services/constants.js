import LocalStorageServices from './localStorageService';

export const today = new Date();

export const tomorrow = today.setDate(today.getDate() + 1);

export const SIDE_BAR_DATA = [
  {
    text: 'Dashboard',
    icon: 'dashboard',
    url: '',
    active: true
  },
  {
    text: 'Admin',
    icon: '',
    url: 'admin',
    active: false
  },
];


export const USER_TOKEN = LocalStorageServices.getAccessToken();
