import React, { ReactElement } from 'react';
import dayjs from 'dayjs';
import BeatLoader from 'react-spinners/BeatLoader';

import { ApplicationsScenes } from './scenes';
import { BorderedButton } from '../../elements/BorderedButton';
import AuthService, { Application } from '../../../services/auth/auth';

interface ApplicationViewItemProps {
  app: Application;
  isFirst: boolean;
  isLast: boolean;
}

const ApplicationViewItem = (props: ApplicationViewItemProps): ReactElement => {
  let roundClassName = '';
  if (props.isFirst && props.isLast) {
    roundClassName = 'rounded';
  } else if (props.isFirst) {
    roundClassName = 'rounded-t';
  } else if (props.isLast) {
    roundClassName = 'rounded-b';
  }

  return (
    <div className={`bg-gray-800 ${roundClassName}`}>
      <div className="p-3">
        <p>
          <span className="font-bold">{props.app.name}</span>
          <span className="ml-1 text-gray-500 text-xs">{dayjs(props.app.createdAt).format('YYYY-MM-DD')}</span>
        </p>
        <p className="text-gray-500 text-xs">{props.app.appId}</p>
      </div>
      {!props.isLast ? <div className="border-b border-gray-700" /> : null}
    </div>
  );
};

interface ApplicationsViewProps {
  onSceneChange: (scene: ApplicationsScenes) => void;
}

interface ApplicationsViewStates {
  apps: Application[];
  loading: boolean;
}

export class ApplicationsView
  extends React.Component<ApplicationsViewProps, ApplicationsViewStates> {
  constructor(props: ApplicationsViewProps) {
    super(props);
    this.state = { apps: [], loading: true };
  }

  componentDidMount = async () => {
    await this.fetchApplications();
  };

  fetchApplications = async () => {
    this.setState({ loading: true });
    const apps = await AuthService.listApplications();
    this.setState({ apps, loading: false });
  };

  render() {
    return (
      <div>
        <BorderedButton className="w-full mb-4" text="New" onClick={() => this.props.onSceneChange(ApplicationsScenes.CREATE)} />
        {
          this.state.loading
            ? <div className="py-4 text-center"><BeatLoader color="white" /></div>
            : this.state.apps.map((app, idx) => (
              <ApplicationViewItem
                key={app.appId}
                app={app}
                isFirst={idx === 0}
                isLast={(this.state.apps.length - 1) === idx}
              />
            ))
        }
      </div>
    );
  }
}
