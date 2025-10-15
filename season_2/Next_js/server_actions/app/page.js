import Image from "next/image";
import fs from "fs/promises";

export default function Home() {

  const submitAction = async (formData) => {
    "use server";
    const name = formData.get("name");
    const address = formData.get("address");
    const email = formData.get("email");

    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Email:", email);

    fs.writeFile("raju.txt", `Name: ${name}\nAddress: ${address}\nEmail: ${email}\n`, (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("Data written to file successfully");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        action={submitAction}
        // action="/api/submit" Replace with your actual handler or API route method="POST"
        className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Contact Form</h1>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="raju bhai"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block mb-1 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="chennai, tamilnadu"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="raju@mail.com"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
