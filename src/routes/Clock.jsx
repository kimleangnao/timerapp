import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ClockFrame from "../component/ClockFrame";
//sounds
import soundBellRing from "../public/sounds/bell_ring.wav";
import etheralVista from "../public/sounds/ethereal_vistas.mp3"
import midnightForest from "../public/sounds/midnight_forest.mp3"
import separation from "../public/sounds/separation.mp3"


const Clock = () => {
    const [colorLines, setColorLines] = useState([
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
        "#DADADA",
    ])

    //POMODORO STATE
    const [breakTime, setBreakTime] = useState(false);
    const [activeTime, setActiveTime] = useState(null)
   
    const breakTimeRef = useRef();

    const {type} = useParams()
    const [searchParams] = useSearchParams();
    let timeInMin = searchParams.get("m");
    let timeInSec = searchParams.get("s");

    const [timerStop, setTimerStop] = useState(false)
    const timerStopRef = useRef()

    const onChangeLinesColor = (totalTime, currentTime) => {
        //time = 12000
        //ctime = 550
        //lines = 12
        /*
            1 line = 100
            math.floor(550 / 100) = 5 lines
        */ 
       let colorsLine12 = [...colorLines];
        let eachLineRepresentInMS = totalTime / 12;
        let currentLimitTo = Math.floor(currentTime / eachLineRepresentInMS);
        for(let i = 0 ; i <= currentLimitTo; i++){
            //
            colorsLine12[i] = "#E17901"
        }
        setColorLines(colorsLine12);
    }


    //console.log(type, timeInMin, timeInSec)
    useEffect(() => {
        if(type == "pomodoro") {
            //time start, or anchor time
            let currentTime = new Date().getTime();

            let intervalCheckingTime = setInterval(() => {
                //console.log("breakTime", breakTimeRef.current)
                if(breakTimeRef.current){
                    //break time
                    let currTime = new Date().getTime();
                    if(currTime - (currentTime + 300000) >= 0){
                        //
                        currentTime = new Date().getTime();
                        //console.log("switch back to active")
                        playSound("active")
                        setBreakTime(false);
                    }else{
                        //still on break
                        let timeLeft  = (currentTime + 300000) - currTime;
                        let timeLeftInSec = Math.ceil(timeLeft / 1000); 
                        //console.log(timeLeft)
                        setActiveTime(timeLeftInSec);
                        onChangeLinesColor(300000, (currTime - currentTime))
                    }
                    
                }else{
                    //it's active time
                    let currTime = new Date().getTime();
               
                    if(currTime - (currentTime + 1500000) >= 0){
                        //time is up switching to break
                        currentTime = new Date().getTime();
                        //console.log("switch back to break")
                        playSound("break")
                        setBreakTime(true);
                    }else{
                        //active still running, keep updating it
                        let timeLeft =  (currentTime + 1500000) - currTime ;
                        let timeLeftInSec = Math.ceil(timeLeft / 1000); 
                        //console.log(timeLeft)

                        setActiveTime(timeLeftInSec);
                        onChangeLinesColor(1500000, (currTime - currentTime))
                    }
                  
                }
            }, 100)

            return () => clearInterval(intervalCheckingTime);
        }else if (type == "countdown"){
            //convert it to second
            let totalNumber = Number(timeInSec) + (Number(timeInMin) * 60);
            let totalTimeInSec = Number(timeInSec) + (Number(timeInMin) * 60);

            let setIntervalCountdown = setInterval(() => {
                //
                if((totalTimeInSec - 1) >= 0){
                    totalTimeInSec -= 1;
                    setActiveTime(totalTimeInSec)
                    //total number, curr number = total - counting down number
                    onChangeLinesColor( totalNumber , totalNumber - totalTimeInSec )
                }else{
                    playSound("break");             
                    clearInterval(setIntervalCountdown);
                }               
            }, 1000)

            return () => clearInterval(setIntervalCountdown)
        }else if (type == "timer"){
            let startTimeInSec = 0;
      
            let intervalTimer = setInterval(() => {
                if(!timerStopRef.current){
                    startTimeInSec += 1;
                    setActiveTime(startTimeInSec);
                }
            }, 1000)

            for(let i = 0; i < colorLines.length; i++){
                colorLines[i] = "black";
            }

            return () => clearInterval(intervalTimer);
        }

    }, [])

    

    const playSound = () => {
        const playSoundRing = new Audio(soundBellRing);
        playSoundRing.play();
    }

    const onStopTimer = () => {
        setTimerStop(prev => !prev)
    }

    useEffect(()=> {
        breakTimeRef.current = breakTime;
        timerStopRef.current =  timerStop;
    }, [breakTime, timerStop])




   

    return(
        <div className="clockWrap">
            {
                type == "pomodoro" ? (
                    <ClockFrame title="POMODORO" type="pomodoro" breakTime={breakTime} time={activeTime} vId={etheralVista} colors12={colorLines}/>
                ) : 
                type == "countdown" ?( <ClockFrame title="COUNTDOWN" type="countdown" breakTime={breakTime} time={activeTime} vId={midnightForest} colors12={colorLines} />
                ) : 
                type == "timer" ?( <ClockFrame title="TIMER" type="timer" breakTime={breakTime} time={activeTime} vId={separation} timerStopFunc={onStopTimer} timerStop={timerStop} colors12={colorLines} />
                ) : ""
            }
           
        </div>
    )
}

export default Clock;