import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import AuthService, { ApiToken, Application, UnauthorizedError } from '../../services/auth/auth';

type SignInProps = {
  app: Application;
  onSignIn: (idToken: string) => void;
  onSuccess: (apiToken: ApiToken) => void;
  onFailure: (e: any) => void;
  onUnauthorized: () => void;
}

export default class SignIn extends React.Component<SignInProps> {
  handleGoogleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const idToken = (res as GoogleLoginResponse).tokenId;
    this.props.onSignIn(idToken);

    try {
      const apiToken = await AuthService.signIn(this.props.app.appId, idToken);
      this.props.onSuccess(apiToken);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        this.props.onUnauthorized();
      }
    }
  };

  handleGoogleFailure = (e: any) => {
    this.props.onFailure(e);
  };

  render() {
    return (
      <GoogleLogin
        className="w-full"
        clientId="231564997458-0v2croa44lifh88vqoc9fuldvcnf1117.apps.googleusercontent.com"
        onSuccess={this.handleGoogleSuccess}
        onFailure={this.handleGoogleFailure}
      />
    );
  }
}
