import React, { ReactEventHandler } from 'react';

interface FilledButtonProps {
  text: string;
  color?: string;
  className?: string
  disabled?: boolean;
  onClick: ReactEventHandler;
}

export function FilledButton(props: FilledButtonProps) {
  const color = props.color || 'purple';

  return (
    <button
      className={`py-2 rounded bg-${color}-900 hover:bg-${color}-800 ${props.disabled ? 'opacity-50' : ''} ${props.className}`}
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
