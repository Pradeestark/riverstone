const localStorageConfig = {
    tokenName: 'GYfXORPwLt',
    refreshTokenName: 'EjBCyjytwP',
    userDetails: 'wfd3csd5c'
  };
  
  const { tokenName, refreshTokenName, userDetails } = localStorageConfig;
  
  const setAccessToken = token => {
    try {
      localStorage.setItem(tokenName, token);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getAccessToken = () => {
    try {
      return localStorage.getItem(tokenName) || '';
    } catch (err) {
      console.log(err);
    }
  };
  
  const setRefreshToken = token => {
    try {
      localStorage.setItem(refreshTokenName, token);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getRefreshToken = () => {
    try {
      return localStorage.getItem(refreshTokenName) || '';
    } catch (err) {
      console.log(err);
    }
  };
  
  const clearAllTokens = () => {
    try {
      localStorage.removeItem(tokenName);
      localStorage.removeItem(refreshTokenName);
      localStorage.removeItem(userDetails);
    } catch (err) {
      console.log(err);
    }
  };
  
  const setUserDetails = user => {
    try {
      localStorage.setItem(userDetails, JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };
  
  const getUserDetails = () => {
    try {
      return JSON.parse(localStorage.getItem(userDetails)) || {};
    } catch (err) {
      console.log(err);
    }
  };
  
  export default {
    setAccessToken,
    getAccessToken,
    setRefreshToken,
    getRefreshToken,
    clearAllTokens,
    setUserDetails,
    getUserDetails
  };
  