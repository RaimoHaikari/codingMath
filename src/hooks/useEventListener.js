import {useEffect, useRef} from 'react'

/*
 * https://usehooks.com/useEventListener/
 */
const useEventListener = (eventName, handler, element = window) => {

    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {

        /*
         * Varmistetaan, että elementti tukee addEventListner -toimintoa
         */
        const isSupported = element && element.addEventListener;

        if(!isSupported) return;

        /*
         * Luodaan tapahtumankäsittelijä joka kutsuu ref:iin
         * tallettua callback-funktiota
         */
        const eventListener = event => savedHandler.current(event);

        element.addEventListener(eventName, eventListener)

        /*
         * Poistetaan tapahtumankäsittelijä sivulta poistuttaessa?
         */
        return () => {
            element.removeEventListener(eventName, eventListener);
        }

    }, [eventName])

}

export default useEventListener;