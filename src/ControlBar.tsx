import { useState } from 'react';

type ControlProps = {
  showContact: boolean, changeShowContact: () => void
}

function ControlBar({showContact, changeShowContact}: ControlProps) {
  const [canHide, setCanHide] = useState(false)
  const [canUnide, setCanUnhide] = useState(false)

  document.addEventListener("selectable:selected", (event) => {
    const selected = document.getElementsByClassName("selected")
    console.log(selected)
    setCanHide(selected.length > 0)
  })
  document.addEventListener("control:hide", (event) => {
    setCanHide(false)
    setCanUnhide(true)
  })
  document.addEventListener("control:unhide", (event) => {
    setCanUnhide(false)
  })

  return (
    <div id="controls">
      <button id="hide-selected" disabled={!canHide} onClick={() => {
        document.dispatchEvent(new Event("control:hide"))
      }}>
        Hide Selected
      </button>
      <button id="unhide-all" disabled={!canUnide} onClick={() => {
        document.dispatchEvent(new Event("control:unhide"))
      }}>
        Unhide All
      </button>
      <label id="show-contact">
        Contact Info
        <input type="checkbox" checked={showContact} onChange={changeShowContact}/>
      </label>
    </div>
  )
}

export default ControlBar
