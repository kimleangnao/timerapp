import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const [selection, setSelection] = useState(null)
    const [timerActive, setTimerActive] = useState(false)

    const [inputMinute, setInputMinute] = useState(null);
    const [inputSeconds, setInputSeconds] = useState(null);

    const nav = useNavigate();

    const onEventSelection = (state=false, type) => {
        if(state){
            setTimerActive(true);
        }else{

            setTimerActive(false);
        }
        setSelection(type);
    }

    const onEventChangeLink = () => {
        
        nav(`/clock/${selection}?m=${inputMinute ? inputMinute : 0}&s=${inputSeconds ? inputSeconds : 0}`)
    }

    const onInputMinute = (e) => {
        if(!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" ){
            e.preventDefault();
        }
    }
    const onInputSeconds = (e) => {
       
        if(!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete"){
            e.preventDefault();
        
        }
    }

    return(
        <div className="home">
            <h1 className="home_title">SELECTION</h1>
            <div className="home_wrap">
                <button onClick={() => onEventSelection(false, "pomodoro")} className={selection == "pomodoro" ? "home_wrap_btn home_wrap_btn-pomodoro" : "home_wrap_btn"}>
                    <p>POMODORO</p>
                    <div className="home_wrap_btn_smallText">
                        <p>25min work / 5min break</p>
                    </div>
                </button>
                <button onClick={() => onEventSelection(true, "countdown")} className={selection == "countdown" ? "home_wrap_btn home_wrap_btn-countdown" : "home_wrap_btn"}>
                    <p>COUNTDOWN</p>
                </button>
                <button onClick={() => onEventSelection(false, "timer")} className={selection == "timer" ? "home_wrap_btn home_wrap_btn-timer" : "home_wrap_btn"}>
                    <p>TIMER</p>
                </button>
                {
                    timerActive ? (
                        <div className="home_wrap_time">
                            <input 
                                onKeyDown={(e) => onInputMinute(e)} 
                                onChange={(e) => setInputMinute(e.target.value)} 
                                type="text" 
                                className="home_wrap_time_input" 
                                placeholder="00" 
                                value={inputMinute ? inputMinute : ""} 
                            />
                            <div className="home_wrap_time_colon">
                                :
                            </div>
                            <input 
                                onKeyDown={(e) => onInputSeconds(e)}  
                                onChange={(e) => setInputSeconds(e.target.value)}
                                type="text" 
                                className="home_wrap_time_input" 
                                placeholder="00" 
                                value={inputSeconds ? inputSeconds : ""} 
                            />
                        </div>
                    ) : ""
                }
               
                <button onClick={() => onEventChangeLink()} className="home_wrap_link"><p>START</p></button >
            </div>
        </div>
    )
}

export default Home;