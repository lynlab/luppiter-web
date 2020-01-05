import React, { ChangeEvent } from 'react';

import AuthService from '../../services/auth/auth';

type CreateAccountProps = {
  idToken: string;
  onSuccess: () => void;
  onFailure: () => void;
};

type CreateAccountStates = {
  username: string;
}

export default class CreateAccount
  extends React.Component<CreateAccountProps, CreateAccountStates> {
  createAccount = async () => {
    await AuthService.createAccount(this.props.idToken, this.state.username);
    this.props.onSuccess();
  };

  handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div className="text-left">
        <p className="text-xl font-bold">Welcome!</p>
        <p className="text-sm">It seems to be the first time to sign in.</p>
        <input
          className="w-full my-4 px-4 py-2 rounded text-gray-900 focus:shadow-outline"
          placeholder="Username"
          onChange={this.handleUsernameChange}
        />
        <button className="w-full mb-4 px-4 py-2 rounded bg-purple-700" type="button" onClick={this.createAccount}>Register</button>
      </div>
    );
  }
}
