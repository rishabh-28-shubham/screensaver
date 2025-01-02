"use client";

import { useEffect, useState } from "react";

export default function Screensaver() {
    const [isActive, setIsActive] = useState(false); // Tracks screensaver activation
    const [time, setTime] = useState(null); // Tracks the current time
    const [backgroundImage, setBackgroundImage] = useState(""); // Stores the uploaded background image URL
    const [hasStartedManually, setHasStartedManually] = useState(false); // Tracks if screensaver was started manually
    const [timeoutId, setTimeoutId] = useState(null); // Stores the timeout ID for inactivity

    useEffect(() => {
        // Ensure time is set only on the client
        setTime(new Date());

        if (!hasStartedManually) {
            const timeout = setTimeout(() => {
                setIsActive(true);
            }, 5000); // 5 seconds of inactivity triggers the screensaver

            setTimeoutId(timeout); // Save timeout ID
        }

        return () => clearTimeout(timeoutId); // Clear timeout when component unmounts or dependency changes
    }, [hasStartedManually, timeoutId]);

    // Update time every second
    useEffect(() => {
        if (typeof window !== "undefined") {
            const timer = setInterval(() => {
                setTime(new Date());
            }, 1000);

            return () => clearInterval(timer);
        }
    }, []);

    // Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file); // Generate a temporary URL for the image
            setBackgroundImage(imageURL); // Set the uploaded image as the background
        }
    };

    // Function to manually activate screensaver
    const startScreensaver = () => {
        setHasStartedManually(true); // Prevent automatic activation
        clearTimeout(timeoutId); // Clear the inactivity timeout
        setIsActive(true); // Activate the screensaver
    };

    // Function to stop the screensaver
    const stopScreensaver = () => {
        setIsActive(false);
        setHasStartedManually(false); // Allow automatic activation again
    };

    if (isActive) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: backgroundImage ? `url(${backgroundImage})` : "black",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "5rem",
                    fontFamily: "monospace",
                }}
            >
                {time && time.toLocaleTimeString()}
                <button
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                    onClick={stopScreensaver}
                >
                    Stop Screensaver
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <h1>Welcome to the Screensaver App!</h1>
            <button
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
                onClick={startScreensaver}
            >
                Start Screensaver
            </button>
            <input
                type="file"
                accept="image/*"
                style={{ marginTop: "20px" }}
                onChange={handleImageUpload}
            />
            <p
                style={{
                    marginTop: "10px",
                    fontSize: "14px",
                }}
            >
                Upload an image to use as the background for your screensaver.
            </p>
        </div>
    );
}
