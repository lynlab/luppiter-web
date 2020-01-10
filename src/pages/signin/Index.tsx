import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import qs from 'query-string';

import Constants from '../../constants';
import AuthService, { Application } from '../../services/auth/auth';
import AuthorizeApp from './AuthorizeApp';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

enum IndexState {
  LOADING, LOADED, INVALID_ACCESS
}

type IndexComponentState = {
  state: IndexState,
  app?: Application;
}

export default class Index extends React.Component<any, IndexComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { state: IndexState.LOADING };
  }

  componentDidMount = async () => {
    const appId = qs.parse(this.props.location.search).app_id as string;
    const app = await AuthService.getApplication(appId || Constants.CONSOLE_APP_ID);
    if (app) {
      this.setState({ state: IndexState.LOADED, app });
    } else {
      this.setState({ state: IndexState.INVALID_ACCESS });
    }
  };

  componentByState = () => {
    switch (this.state.state) {
      case IndexState.LOADING:
        return <div className="text-center"><BeatLoader color="white" /></div>;
      case IndexState.LOADED:
        if (!this.state.app) {
          return null;
        }
        return (
          <SignInContainer
            app={this.state.app}
            redirectUrl={qs.parse(this.props.location.search).redirect_url as string || '/'}
          />
        );
      case IndexState.INVALID_ACCESS:
      default:
        return (
          <div>
            <p className="font-bold">Invalid Access.</p>
            <p>Please contact to system manager if this problem persists.</p>
          </div>
        );
    }
  };

  render() {
    return (
      <div className="h-full w-full flex items-start md:items-center justify-center">
        <div className="w-full m-2 p-8 max-w-128 bg-gray-900">{this.componentByState()}</div>
      </div>
    );
  }
}

enum SignInStep {
  SIGN_IN,
  CREATE_ACCOUNT,
  AUTHORIZE_APP,
}

interface SignInProps {
  app: Application;
  redirectUrl: string;
}

interface SignInState {
  step: SignInStep;
  idToken: string;
}

class SignInContainer extends React.Component<SignInProps, SignInState> {
  constructor(props: any) {
    super(props);
    this.state = { step: SignInStep.SIGN_IN, idToken: '' };
  }

  onSignInSuccess = async () => {
    if (await this.checkAppAuthorized()) {
      this.onFinish();
    } else {
      this.setState({ step: SignInStep.AUTHORIZE_APP });
    }
  };

  onAppAuthorize = async () => {
    await AuthService.createAppAuthorization(this.props.app.appId);
    this.onFinish();
  };

  onFinish = () => {
    const apiToken = AuthService.getIssuedApiToken(this.props.app.appId);
    localStorage.setItem(`luppiter.auth.${this.props.app.appId}`, JSON.stringify(apiToken));
    window.location.href = `${this.props.redirectUrl}?access_key=${apiToken.accessKey}&secret_key=${apiToken.secretKey}&expire_at=${apiToken.expireAt.getTime()}`;
  };

  checkAppAuthorized =
    async (): Promise<boolean> => AuthService.getAppAuthorization(this.props.app.appId);

  componentByState = () => {
    switch (this.state.step) {
      case SignInStep.SIGN_IN:
        return (
          <SignIn
            app={this.props.app}
            onSignIn={(idToken) => this.setState({ idToken })}
            onUnauthorized={() => this.setState({ step: SignInStep.CREATE_ACCOUNT })}
            onSuccess={this.onSignInSuccess}
            onFailure={() => {}}
          />
        );
      case SignInStep.CREATE_ACCOUNT:
        return (
          <CreateAccount
            idToken={this.state.idToken}
            onSuccess={() => this.setState({ step: SignInStep.AUTHORIZE_APP })}
            onFailure={() => {}}
          />
        );
      case SignInStep.AUTHORIZE_APP:
        return <AuthorizeApp onAuthorize={this.onAppAuthorize} onDecline={() => {}} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <p className="text-2xl">
          <span className="text-gray-500">Sign In to </span>
          <span>{this.props.app.name}</span>
        </p>
        <p className="py-2 text-sm text-gray-500">using Luppiter Accounts</p>
        <div className="mt-8">{this.componentByState()}</div>
      </div>
    );
  }
}
