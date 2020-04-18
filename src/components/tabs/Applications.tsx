import React, { ChangeEvent } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';

import { BorderedButton } from '../elements/BorderedButton';
import { FilledButton } from '../elements/FilledButton';
import { ListView } from '../elements/ListView';
import AuthService, { Application } from '../../services/auth/auth';

interface ApplicationsState {
  apps: Application[];

  loading: boolean;
  createMode: boolean;

  createInput: { name?: string, redirectUrl?: string };
}

export class Applications extends React.Component<any, ApplicationsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      apps: [], loading: true, createMode: false, createInput: {},
    };
  }

  componentDidMount = async () => { await this.fetchApplications(); }

  fetchApplications = async () => {
    this.setState({ loading: true });
    const apps = await AuthService.listApplications();
    this.setState({ apps, loading: false });
  };

  createApplication = async () => {
    const { name, redirectUrl } = this.state.createInput;
    await AuthService.createApplication(name!, redirectUrl);
    this.setState({ createMode: false });
    await this.fetchApplications();
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.setState((prev) => ({ createInput: { ...prev.createInput, name: newValue } }));
  }

  handleRedirectUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.setState((prev) => ({ createInput: { ...prev.createInput, redirectUrl: newValue } }));
  }

  render() {
    return (
      <div>
        <BorderedButton className="w-full my-2" text="Create New" onClick={() => this.setState({ createMode: true })} />
        {
          this.state.loading
            ? <div className="py-4 text-center"><BeatLoader color="white" /></div>
            : (
              <ListView items={this.state.apps.map((app) => (
                <div className="p-3">
                  <p>
                    <span className="font-bold">{app.name}</span>
                    <span className="ml-1 text-gray-500 text-xs">{dayjs(app.createdAt).format('YYYY-MM-DD')}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{app.appId}</p>
                </div>
              ))}
              />
            )
        }
        {
          this.state.createMode ? (
            <div className="my-2 p-2 bg-gray-800 rounded">
              <p className="text-lg font-bold">New Application</p>
              <div className="py-1">
                <label className="text-sm">Name</label>
                <input
                  className="w-full px-2 py-1 text-sm rounded bg-gray-100 text-gray-900 focus:shadow-outline"
                  placeholder="My Application"
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="py-1">
                <label className="text-sm">
                  Redirect URL
                  <span className="ml-1 font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  className="w-full px-2 py-1 text-sm rounded bg-gray-100 text-gray-900 focus:shadow-outline"
                  placeholder="https://your-app-url.com"
                  onChange={this.handleRedirectUrlChange}
                />
              </div>
              <FilledButton className="w-full mt-4" text="Create" onClick={() => this.createApplication()} disabled={this.state.createInput.name?.length === 0} />
            </div>
          ) : null
        }
      </div>
    );
  }
}
