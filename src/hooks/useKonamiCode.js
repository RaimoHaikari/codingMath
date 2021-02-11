import {useEffect, useState} from 'react';

/*
 * https://usehooks.com/useKonamiCode/
 */
const useKonamiCode = (handler) => {

    const [keys, setKeys] = useState([]);

    // Alkuperäinen:  'up up down down left right left right B A'
    const isKonamiCode = keys.join(' ') === 'up up down down';

    const getKeyName = (keyCode) => {

        return {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          65: 'A',
          66: 'B',
        }[keyCode];
    };

    /*
     * Näppäinten seurannan alustus
     */ 
    useEffect(() => {

        let timeout;

        // Kun painiketta painetaan...
        window.document.onkeydown = (e) => {
            setKeys((currentKeys) => [...currentKeys, getKeyName(e.keyCode)]);

            // Nollataan ajastin
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                setKeys([])
            }, 2000);
        }
    }, []);


    useEffect(() => {

        if(isKonamiCode){
            handler();  // Suoritetaan paramerin välittämä toiminto...
            setKeys([]) // Tyhjennetään puskurius.
        }
    }, [isKonamiCode, handler])

    /*
     * M I K S I  P A L A U T T A A....
     */
    return isKonamiCode;
}

export default useKonamiCode;