import React from 'react'
import { useRef, useState, useEffect } from 'react';

type SelectableProps = {
  className?: string,
}

type SelectedEventParams = {
  element: HTMLElement, selected: boolean
}

function Selectable(props: React.PropsWithChildren<SelectableProps>) {
    const myRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(false)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
      document.dispatchEvent(new CustomEvent<SelectedEventParams>("selectable:selected", {
        detail: {selected: selected, element: myRef.current!}
      }))
    }, [selected])

    document.addEventListener("control:hide", () => {
      setHidden(selected)
    });
    document.addEventListener("control:unhide", () => {
      if (hidden) {
        setSelected(false)
        setHidden(false)
      }
    })
    document.addEventListener("selectable:selected", (event) => {
      const detail = (event as CustomEvent).detail
      if (detail.selected && detail.element!= myRef.current && detail.element.contains(myRef.current)) {
        // deselect me if my parent got selected
        setSelected(false)
      }
    })

    let classes = ["selectable"]
    if (selected) {
      classes.push("selected")
    }
    if (props.className) {
      classes.push(props.className)
    }
    if (hidden) {
      return <></>
    } else {
      return <div className={classes.join(" ")} ref={myRef} onClick={(event) => {
        const clicked = (event?.target as HTMLElement).closest(".selectable")
        if (myRef.current == clicked) {
          // toggle the element that was clicked on
          setSelected(!selected)
        } else {
          // if it's bubbling up from a child, deselect the parent
          setSelected(false)
        }
      }}>
        {props.children}
      </div>
    }
}

export default Selectable
