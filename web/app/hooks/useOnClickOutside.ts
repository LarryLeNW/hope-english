import { RefObject, useEffect } from "react";

type UseClickOutsideOptions = {
    enabled?: boolean;
    ignoreRefs?: Array<RefObject<HTMLElement | null>>;
    events?: Array<keyof DocumentEventMap>; // ví dụ: ['pointerdown', 'keydown']
};

export default function useClickOutside(
    targetRefs: Array<RefObject<HTMLElement | null>>,
    onOutside: (evt: Event) => void,
    {
        enabled = true,
        ignoreRefs = [],
        events = ["pointerdown"],
    }: UseClickOutsideOptions = {}
) {
    useEffect(() => {
        if (!enabled) return;
        if (typeof document === "undefined") return;

        const opts: AddEventListenerOptions = { capture: true };

        const handler = (e: Event) => {
            const target = e.target as Node | null;
            if (!target) return;

            if (ignoreRefs.some((r) => r.current && r.current.contains(target))) {
                return;
            }

            const clickedInside = targetRefs.some(
                (r) => r.current && r.current.contains(target)
            );
            if (clickedInside) return;

            onOutside(e);
        };

        events.forEach((ev) => document.addEventListener(ev, handler, opts));
        return () => {
            events.forEach((ev) => document.removeEventListener(ev, handler, opts));
        };
    }, [enabled, onOutside, ...targetRefs, ...ignoreRefs, JSON.stringify(events)]);
}
