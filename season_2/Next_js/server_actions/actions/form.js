"use server";
import fs from "fs/promises";

export const submitAction = async (formData) => {
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