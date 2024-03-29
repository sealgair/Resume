import React, {useState} from 'react';

type ControlProps = {
  showContact: boolean, changeShowContact: () => void,
  summarize: boolean, changeSummarize: () => void
}

function ControlBar({showContact, changeShowContact, summarize, changeSummarize}: ControlProps) {
  const [canHide, setCanHide] = useState(false)
  const [canUnide, setCanUnhide] = useState(false)

  document.addEventListener("selectable:selected", (event) => {
    const selected = document.getElementsByClassName("selected")
    setCanHide(selected.length > 0)
  })
  document.addEventListener("control:hide", (event) => {
    setCanHide(false)
    setCanUnhide(true)
  })
  document.addEventListener("control:unhide", (event) => {
    setCanUnhide(false)
  })

  const content = (<>

      <label id="show-contact">
        Show Contact Info
        <input type="checkbox" checked={showContact} onChange={changeShowContact}/>
      </label>
      <label id="summarize">
        Summarize Past Employment
        <input type="checkbox" checked={summarize} onChange={changeSummarize}/>
      </label>
      <span id="hide-buttons">
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
      </span>
    </>
  )

  return <>
    <div id="controls">
      {content}
    </div>
    <div id="control-spacer">
      {/*Copy content into a hidden, realtive position div to add padding
      to the document that's the same height as the control bar*/}
      {content}
    </div>
  </>
}

export default ControlBar
