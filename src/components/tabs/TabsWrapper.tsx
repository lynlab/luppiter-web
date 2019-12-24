import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Icon from '@mdi/react';
import {mdiClose} from '@mdi/js';

import {TabTypes} from "../../models/tab";
import {RootState} from '../../store';
import {removeTab} from "../../store/tab-manager";

const mapState = (state: RootState) => ({ tabManager: state.tabManager });
const connector = connect(mapState, { removeTab });

type ContainerProps = ConnectedProps<typeof connector>;

class TabsWrapper extends React.Component<ContainerProps> {
  handleRemoveTab = (tabType: TabTypes) => {
    this.props.removeTab({ tabType });
  };

  render() {
    return (
      <div className="flex w-full overflow-x-auto">
        {this.props.tabManager.tabs.map((tab) => (
          <div className="w-96 min-w-96 m-2 mr-0 bg-gray-900" key={tab.tabType}>
            {/* Header */}
            <div className="flex">
              <p className="p-3 text-lg font-bold">{tab.tabType}</p>
              <div className="flex-grow"/>
              <div className="p-3 my-auto cursor-pointer" onClick={() => this.handleRemoveTab(tab.tabType)}>
                <Icon path={mdiClose} size="24px" color="#f8f9fa"/>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-800"/>
          </div>
        ))}
      </div>
    );
  }
}

export default connector(TabsWrapper);
