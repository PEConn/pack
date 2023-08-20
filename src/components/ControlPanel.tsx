import React, { useState } from 'react';
import { Button } from './Button';

type ControlPanelProps = {
  currentName: string,
  next: () => void,
  prev: () => void,
  markPacked: () => void,
  markUnneeded: () => void,
  togglePacked: () => void,
  toggleDontNeed: () => void,
}

function ControlPanel({
  currentName,
  next, prev,
  markPacked, markUnneeded,
  togglePacked, toggleDontNeed
}: ControlPanelProps) {
  // TODO: Split out current item from control panel?
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div>
        <div className="center-content">
          <p className="cog" onClick={() => { setShowSettings(!showSettings)}}>⚙️</p>
          <p className="current-item">
          {currentName}
          </p>
        </div>
      </div>
      {!showSettings && (<div className="control-panel">
        <Button label="Prev"       action={prev} />
        <Button label="Next"       action={next} />
        <Button label="Don't Need" action={markUnneeded} />
        <Button label="Packed"     action={markPacked} />
      </div>)}
      {showSettings && (<div className="control-panel">
        <Button label="Toggle Packed" action={togglePacked} small={true} />
        <Button label="Toggle Don't Need" action={toggleDontNeed} small={true} />
      </div>)}
    </>
  );
}

export default ControlPanel;