import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Screensaver App</h1>
      <Link href="/screensaver">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Go to Screensaver
        </button>
      </Link>
    </main>
  );
}
