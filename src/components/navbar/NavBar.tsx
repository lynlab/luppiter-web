import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  mdiCubeOutline, mdiEarth, mdiFile, mdiKeyVariant, mdiLock, mdiSecurity, mdiHexagonMultiple,
} from '@mdi/js/commonjs/mdi';

import NavButton from './NavButton';
import NavDivider from './NavDivider';
import constants from '../../constants';
import { TabTypes } from '../../models/tab';
import AuthService from '../../services/auth/auth';
import { RootState } from '../../store';
import { addTab } from '../../store/tab-manager';

const mapState = (state: RootState) => ({ tabManager: state.tabManager });
const connector = connect(mapState, { addTab });

type NavBarProps = ConnectedProps<typeof connector>;
type NavBarStates = { signedIn: boolean };

class NavBar extends React.Component<NavBarProps, NavBarStates> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = { signedIn: AuthService.hasSignedIn(constants.CONSOLE_APP_ID) };
  }


  handleAddTab = (tabType: TabTypes) => {
    this.props.addTab({ tabType });
  };

  handleSignOut = () => {
    AuthService.signOut(constants.CONSOLE_APP_ID);
    this.setState({ signedIn: false });
  };

  render() {
    return (
      <div className="w-24 h-screen py-2 bg-gray-900 text-center">
        {
          this.state.signedIn
            ? (
              <div>
                <NavButton text="Sign Out" icon={mdiLock} onClick={this.handleSignOut} />
                <NavButton text="API Keys" icon={mdiKeyVariant} onClick={() => this.handleAddTab(TabTypes.ApiKey)} />
                <NavButton text="Applications" icon={mdiHexagonMultiple} onClick={() => this.handleAddTab(TabTypes.Applications)} />

                <NavDivider />

                <NavButton text="Storage" icon={mdiFile} onClick={() => this.handleAddTab(TabTypes.Storage)} />

                <NavDivider />

                <NavButton text="Certs" icon={mdiSecurity} onClick={() => this.handleAddTab(TabTypes.Certs)} />

                <NavDivider />

                <NavButton text="Hosting" icon={mdiEarth} onClick={() => this.handleAddTab(TabTypes.Hosting)} />
                <NavButton text="Container" icon={mdiCubeOutline} onClick={() => this.handleAddTab(TabTypes.CloudContainer)} />
              </div>
            )
            : (
              <div>
                <Link to="/signin">
                  <NavButton text="Sign In" icon={mdiLock} />
                </Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default connector(NavBar);
