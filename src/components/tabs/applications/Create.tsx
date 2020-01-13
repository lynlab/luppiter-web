import React from 'react';

import { ApplicationsScenes } from './scenes';
import { FilledButton } from '../../elements/FilledButton';
import AuthService from '../../../services/auth/auth';

interface ApplicationCreateProps {
  onSceneChange: (scene: ApplicationsScenes) => void;
}

interface ApplicationCreateStates {
  name: string;
  redirectUrl: string;
}

export class ApplicationCreate
  extends React.Component<ApplicationCreateProps, ApplicationCreateStates> {
  constructor(props: ApplicationCreateProps) {
    super(props);
    this.state = { name: '', redirectUrl: '' };
  }

  onSubmit = async () => {
    await AuthService.createApplication(this.state.name, this.state.redirectUrl);
    this.props.onSceneChange(ApplicationsScenes.VIEW);
  };

  render() {
    return (
      <div>
        <p className="text-lg font-bold">Create New Application</p>
        <div className="py-2">
          <label className="text-sm font-bold">Name</label>
          <input
            className="w-full mt-2 px-2 py-1 text-sm rounded bg-gray-100 text-gray-900 focus:shadow-outline"
            placeholder="My Application"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="py-2">
          <label className="text-sm font-bold">
            Redirect URL
            <span className="ml-1 font-normal text-gray-500">(optional)</span>
          </label>
          <input
            className="w-full mt-2 px-2 py-1 text-sm rounded bg-gray-100 text-gray-900 focus:shadow-outline"
            placeholder="https://your-app-url.com"
            onChange={(e) => this.setState({ redirectUrl: e.target.value })}
          />
        </div>

        <FilledButton className="w-full my-2" text="Create" onClick={() => this.onSubmit()} disabled={this.state.name.length === 0} />
      </div>
    );
  }
}
