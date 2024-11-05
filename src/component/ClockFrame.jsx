

import ClockLines from "../component/ClockLines";
import { useEffect, useRef, useState } from "react";


const ClockFrame = ({title, type, breakTime, time, vId, timerStopFunc=null, timerStop=null, colors12}) => {
    const [timeInMinute, setTimeInMinute] = useState();
    const [timeInSec, setTimeInSec] = useState();


    const playerRef = useRef();

    const [playButton, setPlayButton] = useState(false);
    const [getCurrentTime, setGetCurrentTime] = useState(null)
    const [duration, setDuration] = useState(null)

    const onMusicReady = () => {
     
        let cSound = new Audio(vId);
        cSound.volume = 0.25;
        cSound.loop = true;
        cSound.play();
        setPlayButton(true);
        
        //when this meta
        cSound.addEventListener('loadedmetadata', () => {
            setDuration(cSound.duration); // Set duration in seconds
        });
    
        playerRef.current = cSound;
    }

    const onClickPlay = () => {
        if(playerRef.current){
            if(playButton){
                playerRef.current.pause();
                setPlayButton(false)
            }else{
                playerRef.current.play();
                setPlayButton(true)
            }
        }
    }

    useEffect(() => {
        if(title == "POMODORO"){
            document.title = "Pomodoro - Focus Mode!"
        }else if (title == "COUNTDOWN"){
            document.title = "Countdown - Mental Tougness Mode!"
        }else if (title == "TIMER"){
            document.title = "Timer - Conquer Mode!"
        }
   
    }, [])

    useEffect(() => {
        onMusicReady();
        const interval = setInterval(()=> {
            if(playerRef.current){
                setGetCurrentTime(playerRef.current.currentTime)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
            if(playerRef.current){
                playerRef.current.pause();
                playerRef.current.currentTime = 0;
            }
        }
    }, [])
    
    useEffect(() => {
        //convert time to minute
        let min = Math.floor(time / 60);
        let sec = time % 60 ;
        setTimeInMinute(min);
        setTimeInSec(sec)
    
    }, [time])

    //unmount the audio
 
 
    return(
        <div className="clock">
        <h1 className="clock_title">{title}</h1>
        <div className="clock_wrap">
            <ClockLines line={12} colors12={colors12} />

            <div className={type == "pomodoro" && breakTime ? "clock_wrap_absolute-break" : "clock_wrap_absolute"}>
                {type == "pomodoro" && breakTime ? (
                    <div className="clock_wrap_absolute_wrap">
                        <p><i className="fa-solid fa-mug-hot"></i></p>
                        <p>{timeInMinute + " Min"} {timeInSec + " Sec"}</p>
                    </div>
                ) : (
                    <div className="clock_wrap_absolute_wrapNormal">    
                        <p>{timeInMinute + " Min"} {timeInSec + " Sec"}</p>
                    </div>
                )}               
            </div>


            <p className="clock_wrap_inspiration">&quot;KEEP GOING, DON&apos;T STOP&quot;</p>
            {
                type == "timer" ? (
                    <button className="clock_wrap_btn" onClick={() => timerStopFunc()}>{timerStop ? "PLAY" : "STOP"}</button>
                ) : ""
            }
         
            
            <div className="clock_wrap_musicPlayer">
                <div className="clock_wrap_musicPlayer_btns">
                    <button className="clock_wrap_musicPlayer_btns_btnSmall">
                        <i className="fa-solid fa-backward"></i>
                    </button>
                    <button onClick={() => onClickPlay()} className="clock_wrap_musicPlayer_btns_btnBig">
                        {playButton ? (
                            <i className="fa-solid fa-pause"></i>
                        ) : (
                              <i className="fa-solid fa-play"></i>
                        )}
                      
                    </button>
                    <button className="clock_wrap_musicPlayer_btns_btnSmall">
                        <i className="fa-solid fa-forward"></i>
                    </button>
                </div>

                <div className="clock_wrap_musicPlayer_progress">
                    <div className="clock_wrap_musicPlayer_progress_current" 
                        style={{width : `${ (getCurrentTime / duration) * 100}%`}}
                    >

                    </div>
                </div>
             
            </div>
        </div>
      
    </div>
    )
}

export default ClockFrame;