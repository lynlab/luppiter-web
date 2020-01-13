import React, { ReactEventHandler } from 'react';

interface BorderedButtonProps {
  text: string;
  color?: string;
  className?: string
  disabled?: boolean;
  onClick: ReactEventHandler;
}

export function BorderedButton(props: BorderedButtonProps) {
  const color = props.color || 'gray';
  return (
    <button
      className={`py-2 rounded border border-${color}-400 hover:border-${color}-500 text-${color}-400 hover:text-${color}-500 ${props.className}`}
      onClick={props.onClick}
      type="button"
    >
      {props.text}
    </button>
  );
}
