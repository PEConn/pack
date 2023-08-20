import React, { MouseEvent } from 'react';
import './ControlPanel.css';

type ControlPanelProps = {
  currentName: string,
  next: () => void,
  prev: () => void,
  markPacked: () => void,
  markUnneeded: () => void,
}

function ControlPanel({ currentName, next, prev, markPacked, markUnneeded }: ControlPanelProps) {
  // TODO: Split out current item from control panel?
  return (
    <>
      <div className="center-content">
        <p className="current-item">
        {currentName}
        </p>
      </div>
      <div className="control-panel">
        <Button label="Prev"       action={prev} />
        <Button label="Next"       action={next} />
        <Button label="Don't Need" action={markUnneeded} />
        <Button label="Packed"     action={markPacked} />
      </div>
    </>
  );
}


// TODO: Move button into a separate file.
type ButtonProps = {
  label: string,
  action: () => void,
}

export function Button({ label, action }: ButtonProps) {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    action();
    event.preventDefault();
  }

  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

export default ControlPanel;