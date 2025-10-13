import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <Image
        src="/next-logo.png"
        alt="Next.js Logo"
        width={200}
        height={100}
      />
    </div>
  );
}
