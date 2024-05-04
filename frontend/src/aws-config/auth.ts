const Auth = {
    // region: import.meta.env.REACT_APP_AUTH_REGION,
    userPoolId: import.meta.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolClientId: import.meta.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
    // cookieStorage: {
    //   domain: import.meta.env.REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN,
    //   path: '/',
    //   expires: 365,
    //   sameSite: "strict",
    //   secure: true
    // },
    // authenticationFlowType: 'USER_SRP_AUTH',
  }
  
  export default Auth;