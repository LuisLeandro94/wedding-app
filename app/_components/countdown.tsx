import { useEffect, useRef, useState } from "react";
import { CountdownCard } from './countdownCard';
import LoadingSpinner from "./loading";

export const CountdownTimer = () => {
    //card ref
    const SecondsCardRef = useRef<HTMLDivElement>(null);
    const MinutesCardRef = useRef<HTMLDivElement>(null);
    const HoursCardRef = useRef<HTMLDivElement>(null);
    const DaysCardRef = useRef<HTMLDivElement>(null);
    //state
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const targetDate = new Date("07/04/2026 14:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            if (distance < 0) {
                clearInterval(interval);
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
            }
            setLoading(false);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown__container" >
            {isLoading ? <LoadingSpinner /> : (
                <>
                    <CountdownCard
                        label="days"
                        number={days}
                        cardRef={DaysCardRef}
                    />
                    <CountdownCard
                        label="hours"
                        number={hours}
                        cardRef={HoursCardRef}
                    />
                    <CountdownCard
                        label="minutes"
                        number={minutes}
                        cardRef={MinutesCardRef}
                    />
                    <CountdownCard
                        label="seconds"
                        number={seconds}
                        cardRef={SecondsCardRef}
                    />
                </>
            )}
        </div >
    )
}