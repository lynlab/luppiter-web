import React, { Component, ReactElement } from 'react';

interface ListViewProps {
  items: ReactElement[];
}

export class ListView extends Component<ListViewProps> {
  render() {
    return (
      this.props.items.map((item, idx) => {
        const isFirst = (idx === 0);
        const isLast = (idx === this.props.items.length - 1);
        const roundingClass = `${isFirst ? 'rounded-t' : ''} ${isLast ? 'rounded-b' : ''}`;
        return (
          <div className={`bg-gray-800 ${roundingClass}`}>
            {item}
            {!isLast ? <div className="border-b border-gray-700" /> : null}
          </div>
        );
      })
    );
  }
}
