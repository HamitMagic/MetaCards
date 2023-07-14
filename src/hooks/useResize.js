import interact from "interactjs";
import { useEffect, useRef } from "react";

export function useResize() {
    const elementRef = useRef();
    const position = { x: 0, y: 0 };

    useEffect(() => {
        interact(elementRef.current)
        .resizable({
            // resize from all edges and corners
            edges: { left: false, right: false, bottom: true, top: false },
            listeners: {
                move (event) {
                    const target = event.target;
                    let { x, y } = event.target.dataset;

                    // update the element's style
                    target.style.width = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';
                    // translate when resizing from top or left edges
                    // x += event.deltaRect.left
                    // y += event.deltaRect.top

                    target.style.transform = `translate(${x}px ${y}px)`;

                    Object.assign(event.target.dataset, { x, y });
                },
            },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: 'parent',
                }),
                // minimum & maximum sizes
                interact.modifiers.restrictSize({
                    min: { width: 80, height: 120 },
                    max: { width: 200, height: 300 },
                }),
                interact.modifiers.aspectRatio({
                    ratio: 0.6666667,
                }),
            ],

            inertia: true,
        })
        .draggable({
            listeners: { 
                move: window.dragMoveListener,
                move (event) {
                    position.x += event.dx;
                    position.y += event.dy;
              
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
                }, 
            },
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true,
                })
            ],
        })
    }, []);

    return elementRef;
}