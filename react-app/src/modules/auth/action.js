import LocalStorageServices from '../../services/localStorageService';

export const isLoggedIn = () => {
  const token = LocalStorageServices.getAccessToken();
  return token ;
};

export const redirectToDashboard = ({ history }) => {
  if (isLoggedIn()){
    if(history)  return history.push('dashboard');
    window.location.href = "/"
  } 
};
