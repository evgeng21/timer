import React, {useEffect, useState} from 'react';

function Timer() {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [message, setMessage] = useState({
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
        output: 'Нажмите кнопку старт'
    })
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                // debugger
                if (message.minutes > 0 || message.seconds > 0) {
                    setMessage((prev) => {
                        // debugger
                        if (prev.seconds > 0 && prev.minutes >= 0) {
                            return {
                                minutes: prev.minutes,
                                seconds: prev.seconds - 1,
                                output: prev.minutes + ':' + prev.seconds
                            }
                        } else if (prev.seconds === 0 && prev.minutes > 0) {
                            return {
                                minutes: prev.minutes - 1,
                                seconds: 59,
                                output: prev.minutes + ':' + prev.seconds
                            }
                        } else {
                            setIsActive(false);
                            setMessage({
                                minutes,
                                seconds,
                                output: 'Время вышло'
                            });
                        }
                    });
                } else {
                    setIsActive(false);
                    setMessage({
                        minutes,
                        seconds,
                        output: 'Время вышло'
                    });
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isActive, message]);

    const handleClickStart = () => {
        setIsActive(true);
        setMessage({
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            output: minutes + ':' + seconds
        })

    };

    const handleClickStop = () => {
        setIsActive(false);
    };

    const handleClickClear = () => {
        setIsActive(false);
        setMessage({
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            output: 'Нажмите кнопку старт'
        })
    };

    return (
        <>
            <input type="number" step="1" value={minutes} id="minutes" min={0}
                   onChange={(event) => setMinutes(parseInt(event.target.value))}/>
            <input type="number" step="1" value={seconds} id="seconds" min={0}
                   onChange={(event) => setSeconds(parseInt(event.target.value))}/>
            <br/>
            <button className="btn" id="start" onClick={handleClickStart}>START</button>
            <button className="btn" id="stop" onClick={handleClickStop}>STOP</button>
            <button className="btn" id="clear" onClick={handleClickClear}>CLEAR</button>
            <h1>{message.output}</h1>
        </>
    );
}

export default Timer;