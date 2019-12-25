import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  mdiCubeOutline, mdiEarth, mdiFile, mdiKeyVariant, mdiLock, mdiSecurity,
} from '@mdi/js/commonjs/mdi';

import NavButton from './NavButton';
import NavDivider from './NavDivider';
import { TabTypes } from '../../models/tab';
import { RootState } from '../../store';
import { addTab } from '../../store/tab-manager';

const mapState = (state: RootState) => ({ tabManager: state.tabManager });
const connector = connect(mapState, { addTab });

type ContainerProps = ConnectedProps<typeof connector>;

class NavBar extends React.Component<ContainerProps> {
  handleAddTab = (tabType: TabTypes) => {
    this.props.addTab({ tabType });
  };

  handleMoveRoute = () => {};

  render() {
    return (
      <div className="w-20 h-screen py-2 bg-gray-900 text-center">
        <NavButton text="로그인" icon={mdiLock} onClick={this.handleMoveRoute} />
        <NavButton text="API Keys" icon={mdiKeyVariant} onClick={this.handleMoveRoute} />

        <NavDivider />

        <NavButton text="Storage" icon={mdiFile} onClick={() => this.handleAddTab(TabTypes.Storage)} />

        <NavDivider />

        <NavButton text="Certs" icon={mdiSecurity} onClick={() => this.handleAddTab(TabTypes.Certs)} />

        <NavDivider />

        <NavButton text="Hosting" icon={mdiEarth} onClick={() => this.handleAddTab(TabTypes.Hosting)} />
        <NavButton text="Container" icon={mdiCubeOutline} onClick={() => this.handleAddTab(TabTypes.CloudContainer)} />
      </div>
    );
  }
}

export default connector(NavBar);
