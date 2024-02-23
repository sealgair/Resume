import React from 'react'
import { useRef, useState, useEffect } from 'react';

type SelectableProps = {
  className?: string,
  relates?: string,
  related?: Array<string>
}

type SelectedEventParams = {
  element: HTMLElement,
  selected: boolean
}

type RelatedEventParams = {
  relates?: string,
  related?: Array<string>,
  select?: boolean
}

function Selectable(props: React.PropsWithChildren<SelectableProps>) {
    const myRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [highlighted, setHighlighted] = useState(false)

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
        setSelected(detail.select)
      }
    })
    document.addEventListener("selectable:hover", (event) => {
      const detail = (event as CustomEvent).detail
      const highlight =  props.related?.includes(detail.relates) ||
                         detail.related?.includes(props.relates)
      setHighlighted(highlight)
    })
    document.addEventListener("selectable:unhover", (event) => {
      setHighlighted(false)
    })
    document.addEventListener("selectable:relate", (event) => {
      const detail = (event as CustomEvent).detail
      if (props.related?.includes(detail.relates)) {
        setSelected(detail.select)
      }
    })

    let classes = ["selectable"]
    if (selected) {
      classes.push("selected")
    }
    if (highlighted) {
      classes.push("highlighted")
    }
    if (props.className) {
      classes.push(props.className)
    }
    if (hidden) {
      return <></>
    } else {
      return <div className={classes.join(" ")} ref={myRef} onClick={(event) => {
        if (props.relates) {
          // select all realated
          document.dispatchEvent(new CustomEvent<RelatedEventParams>("selectable:relate", {
            detail: {relates: props.relates, select: !selected}
          }))
        }

        const clicked = (event?.target as HTMLElement).closest(".selectable")
        if (myRef.current == clicked) {
          // toggle the element that was clicked on
          setSelected(!selected)
        } else {
          // if it's bubbling up from a child, deselect the parent
          setSelected(false)
        }
      }} onMouseEnter={() => {
        document.dispatchEvent(new CustomEvent<RelatedEventParams>("selectable:hover", {
          detail: {relates: props.relates, related: props.related}
        }))
      }} onMouseLeave={() => {
        document.dispatchEvent(new Event("selectable:unhover"))
      }}>
        {props.children}
      </div>
    }
}

export default Selectable
