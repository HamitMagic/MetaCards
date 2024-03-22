import React, { useEffect, useState } from 'react';
import classes from './pages.module.css'
import Modal from './modal/Modal';
import { Link } from 'react-router-dom';
import ACTIONS from '../socket/actions';
import socket from '../socket';
import decks from "../public/decks.json" 
import { observer } from 'mobx-react';
import { v4 } from 'uuid';

function Header() {
    const [roomID, setRoomID] = useState(v4());
    const [remoteShow, setRemoteShow] = useState(false);
    const [deckShow, setDeckShow] = useState(false);
    const [settingsShow, setSettingsShow] = useState(false);
    const [fullScreen, setFullScreen] = useState(true);

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, () => {
            if (!roomID) setRoomID(v4());
        })
    }, []);

    async function handleFullScreen() {
        const el = document.documentElement;
        if (fullScreen) {
            if (el.requestFullscreen) await el.requestFullscreen();
            else if (el.webkikRequestFullscreen) await el.webkikRequestFullscreen();
            else if (el.msRequestFullscreen) await el.msRequestFullscreen();
        }
        else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                await document.webkitExitFullscreen();
            }
        }
    }

    function showModal(event, arrg) {
        event.stopPropagation();
        event.preventDefault()

        if (event.target.className === classes.modalActive 
            || event.target.className === classes.modalWindow
            || event.target.className === classes.title) {
                return
        }
        switch (arrg) {
            case 'remote':
                setRoomID(v4());
                setRemoteShow(!remoteShow);
                break;
            case 'setDeck':
                setDeckShow(!deckShow)
                break;
            case 'settings':
                setSettingsShow(!settingsShow)
                break;
            default:
                console.log('Ой что-то пошло не так как ожидалось((');
        } 
        
    }

    return (
        <>
            <header className={classes.header}>
                <Link to='/' >
                    <button>
                        <svg width="48" height="48" viewBox="0 2 23 20" >
                            <path d="M16,8.41L11.5,3.91L4.41,11H6V12L6,19H9V13H14V19H17V11H18.59L17,9.41V6H16V8.41M2,12L11.5,2.5L15,6V5H18V9L21,12H18V20H13V14H10V20H5V12H2Z" 
                                fill="#343641"
                                fillRule="evenodd" 
                                clipRule="evenodd"
                                width='48'
                                height='48' />
                        </svg>
                    </button>
                </Link>
                <div>
                    <button onClick={(e) => showModal(e, 'setDeck')}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                fillRule="evenodd" 
                                clipRule="evenodd" 
                                d="M24.9998 7H37.9998C39.6567 7 40.9998 8.34315 40.9998 10V36C40.9998 37.6569 39.6567 39 37.9998 39H34.5025L35.5402 38.4009C37.9317 37.0202 38.751 33.9622 37.3703 31.5708L24.5297 9.33012C24.148 8.66897 23.638 8.12798 23.0495 7.72042C23.5739 7.27129 24.2552 7 24.9998 7ZM21.0713 6.9066C21.9869 5.74543 23.4063 5 24.9998 5H37.9998C40.7612 5 42.9998 7.23858 42.9998 10V36C42.9998 38.7614 40.7612 41 37.9998 41H31.0384L24.2057 44.9449C21.8143 46.3256 18.7563 45.5062 17.3756 43.1147L4.53497 20.8741C3.15425 18.4826 3.97363 15.4247 6.36509 14.0439L17.6995 7.5C18.7605 6.88745 19.9527 6.70793 21.0713 6.9066ZM7.36509 15.776L18.6995 9.23205C20.1344 8.40362 21.9692 8.89525 22.7976 10.3301L35.6383 32.5708C36.4667 34.0057 35.9751 35.8404 34.5402 36.6689L23.2057 43.2128C21.7709 44.0412 19.9361 43.5496 19.1077 42.1147L6.26702 19.8741C5.43859 18.4392 5.93021 16.6044 7.36509 15.776Z" 
                                fill="#343641" />
                        </svg>
                    </button>
                    <button onClick={(e) => showModal(e, 'remote')}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 19L36 23" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M27 14L31 14" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" />
                            <path 
                                d="M33 14C33.7956 14 34.5589 14.3161 35.1215 14.8787C35.6841 15.4413 36 16.2044 36 17" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                            <path 
                                d="M22.9116 18.7395V8.30473C22.9116 7.15214 21.9773 6.21777 20.8247 6.21777L4.12901 6.21777C2.97641 6.21777 2.04205 7.15214 2.04205 8.30473V18.7395C2.04205 19.8921 2.97641 20.8265 4.12901 20.8265H20.8247C21.9773 20.8265 22.9116 19.8921 22.9116 18.7395Z" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                            <path 
                                d="M45.957 39.6956V29.2608C45.957 28.1082 45.0227 27.1738 43.8701 27.1738H27.1744C26.0218 27.1738 25.0875 28.1082 25.0875 29.2608V39.6956C25.0875 40.8482 26.0218 41.7825 27.1744 41.7825H43.8701C45.0227 41.7825 45.957 40.8482 45.957 39.6956Z" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                            <path d="M12 33L12 29" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M21 38L17 38" stroke="#343641" strokeWidth="2" strokeMiterlimit="10" />
                            <path 
                                d="M15 38C14.2044 38 13.4411 37.6839 12.8785 37.1213C12.3159 36.5587 12 35.7956 12 35" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                            <path 
                                d="M7 25C8.44247 24.3509 10.1969 24 12 24C13.8031 24 15.5575 24.3509 17 25" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                            <path 
                                d="M31 46C32.4425 45.3509 34.1969 45 36 45C37.8031 45 39.5575 45.3509 41 46" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeMiterlimit="10" />
                        </svg>
                    </button>
                    <button onClick={() => {
                        setFullScreen(!fullScreen);
                        handleFullScreen();
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33 8H40V15" stroke="#343641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 40H8V31" stroke="#343641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M40 31V40H33" stroke="#343641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 15V8H17" stroke="#343641" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button onClick={(e) => showModal(e, 'settings')}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M24 32.2499C28.5563 32.2499 32.2499 28.5563 32.2499 24C32.2499 19.4436 28.5563 15.75 24 15.75C19.4436 15.75 15.75 19.4436 15.75 24C15.75 28.5563 19.4436 32.2499 24 32.2499Z" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" />
                            <path 
                                d="M34.4366 12.2038C34.917 12.6291 35.3711 13.0832 35.7964 13.5635L40.9193 14.2951C41.7501 15.7417 42.3906 17.2895 42.825 18.9002L39.7211 23.0387C39.7211 23.0387 39.7601 24.321 39.7212 24.9614L42.8264 29.1011C42.3909 30.7115 41.7493 32.2589 40.9176 33.705L35.7964 34.4365C35.7964 34.4365 34.9172 35.3709 34.4369 35.7962L33.7054 40.9191C32.2587 41.7498 30.7109 42.3904 29.1002 42.8248L24.962 39.7209C24.3216 39.7598 23.6794 39.7599 23.039 39.7209L18.8993 42.8261C17.2889 42.3906 15.7415 41.7491 14.2954 40.9173L13.564 35.7964C13.0837 35.3711 12.6296 34.917 12.2043 34.4367L7.08134 33.7051C6.25058 32.2585 5.61006 30.7106 5.17566 29.1L8.27962 24.9615C8.27962 24.9615 8.24057 23.6791 8.27949 23.0388L5.17432 18.8991C5.6098 17.2887 6.25137 15.7413 7.08312 14.2952L12.204 13.5638C12.6293 13.0834 13.0834 12.6293 13.5638 12.204L14.2953 7.08111C15.7419 6.25034 17.2898 5.60982 18.9005 5.17542L23.0386 8.27926C23.679 8.24033 24.3212 8.24033 24.9616 8.27925L29.1014 5.17407C30.7117 5.60956 32.2591 6.25113 33.7052 7.08287L34.4366 12.2038Z" 
                                stroke="#343641" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </header>
            {remoteShow && <Modal cb={showModal} title='Создан удаленный сеанс' text={roomID} id='remote' />}
            {deckShow && <Modal cb={showModal} title='Выберите колоду карт' text={decks} id='setDeck' />}
            {settingsShow && <Modal cb={showModal} title='Настройки' text='В разработке' id='settings' />}

            
        </>
    );
}
export default observer(Header);