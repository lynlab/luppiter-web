import React, { ReactElement } from 'react';

import { ApplicationCreate } from './Create';
import { ApplicationsView } from './View';
import { ApplicationsScenes } from './scenes';

interface ApplicationsState {
  scene: ApplicationsScenes;
}

export class Applications extends React.Component<any, ApplicationsState> {
  constructor(props: any) {
    super(props);
    this.state = { scene: ApplicationsScenes.VIEW };
  }

  onSceneChange = (scene: ApplicationsScenes): void => { this.setState({ scene }); };

  componentByScene = (scene: ApplicationsScenes): ReactElement => {
    switch (scene) {
      case ApplicationsScenes.CREATE:
        return <ApplicationCreate onSceneChange={this.onSceneChange} />;
      case ApplicationsScenes.VIEW:
      default:
        return <ApplicationsView onSceneChange={this.onSceneChange} />;
    }
  };

  render() {
    return this.componentByScene(this.state.scene);
  }
}
