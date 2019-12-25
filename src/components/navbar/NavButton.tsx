import Icon from '@mdi/react';
import React, { MouseEvent } from 'react';

type NavButtonProps = {
  text: string,
  icon: string,
  onClick: (e: MouseEvent) => void,
}

export default (props: NavButtonProps) => {
  const { text, icon, onClick } = props;
  return (
    <div className="py-2 hover:bg-gray-800 cursor-pointer" onClick={onClick}>
      <Icon className="mx-auto" path={icon} size="28px" color="#f8f9fa" />
      <p className="py-1 text-sm">{text}</p>
    </div>
  );
};
