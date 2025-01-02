"use client";

// import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Screensaver() {
    const [isActive, setIsActive] = useState(false); // Tracks screensaver activation
    const [time, setTime] = useState(new Date()); // Tracks the current time
    const [backgroundImage, setBackgroundImage] = useState(""); // Stores the uploaded background image URL

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsActive(true);
        }, 5000); // 5 seconds of inactivity triggers the screensaver

        const handleMouseMove = () => {
            setIsActive(false); // Deactivates screensaver
            clearTimeout(timeout);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
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
        setIsActive(true);
    };

    if (!isActive) {
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
            {time.toLocaleTimeString()}
        </div>
    );
}
