"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Screensaver() {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

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
        if (isActive) {
            const interval = setInterval(() => {
                setPosition({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <motion.div
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
                overflow: "hidden",
            }}
        >
            <motion.div
                animate={{
                    x: position.x,
                    y: position.y,
                }}
                style={{
                    width: 50,
                    height: 50,
                    background: "red",
                    borderRadius: "50%",
                }}
            />
        </motion.div>
    );
}
