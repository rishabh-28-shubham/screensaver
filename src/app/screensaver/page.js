"use client";

// import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Screensaver() {
    const [isActive, setIsActive] = useState(false);
    const [time , setTime] = useState(new Date());

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsActive(true);
        }, 5000); // 5 seconds of inactivity triggers the screensaver

        const handleMouseMove = () => {
            setIsActive(false);
            clearTimeout(timeout);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    if (!isActive) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "5rem",
                fontFamily: "monospace",
            }}
        >
            {time.toLocaleTimeString()}
        </div>
    );
}

//Description of this code

// 1. tracks user inactivity to trigger the Screensaver
// 2. dispalys the current time in a large, centered font.
// 3. the time udates every second using setInterval.