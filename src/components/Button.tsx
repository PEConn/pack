import React, { MouseEvent } from 'react';

type ButtonProps = {
  label: string,
  action: () => void,
  small?: boolean,
}
  
export function Button({ label, action, small }: ButtonProps) {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    action();
    event.preventDefault();
  }

  return (
    <button onClick={onClick} className={small ? "small" : ""}>
      {label}
    </button>
  )
}