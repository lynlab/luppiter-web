import Icon from '@mdi/react';
import React, { MouseEvent } from 'react';

type NavButtonProps = {
  text: string,
  icon: string,
  onClick: (e: MouseEvent) => void,
}

export default class NavButton extends React.Component<NavButtonProps> {
  render() {
    return (
      <div className="py-2 hover:bg-gray-800 cursor-pointer" onClick={this.props.onClick}>
        <Icon className="mx-auto" path={this.props.icon} size="28px" color="#f8f9fa"/>
        <p className="py-1 text-sm">{this.props.text}</p>
      </div>
    );
  }
}
