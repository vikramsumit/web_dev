// Manager.jsx
import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = "http://localhost:5000";

const Manager = () => {
    const eyeRef = useRef(null);
    const passwordRef = useRef(null);

    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch existing passwords
    const getPasswords = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/`);
            const passwords = await res.json();
            setPasswordArray(passwords || []);
        } catch (err) {
            console.error("Failed to fetch passwords:", err);
            toast.error("Failed to fetch passwords");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    // copy to clipboard with feedback
    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Clipboard write failed:", err);
            toast.error("Unable to copy to clipboard");
        }
    };

    // toggle password visibility on the input field
    const showPassword = () => {
        if (!passwordRef.current || !eyeRef.current) return;
        const input = passwordRef.current;
        const img = eyeRef.current;

        if (input.type === "password") {
            input.type = "text";
            img.src = "icons/eyecross.png";
        } else {
            input.type = "password";
            img.src = "icons/eye.png";
        }
    };

    // Save (new) or Update (existing)
    const savePassword = async () => {
        // simple validation
        if (!form.site?.trim() || !form.username?.trim() || !form.password?.trim()) {
            toast.error("Please fill in all fields (min 1 char).");
            return;
        }

        try {
            setLoading(true);
            // normalize site (optional): trim
            const trimmed = {
                site: form.site.trim(),
                username: form.username.trim(),
                password: form.password.trim(),
            };

            // If editing (form.id exists) -> update via PUT
            if (form.id) {
                const payload = { ...trimmed, id: form.id };
                const res = await fetch(`${API_BASE}/`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error("Update failed");

                // update local state
                setPasswordArray(prev => prev.map(p => (p.id === payload.id ? payload : p)));
                toast.success("Password updated!");
            } else {
                // Create new: generate id once and use it consistently
                const id = uuidv4();
                const payload = { ...trimmed, id };

                const res = await fetch(`${API_BASE}/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error("Save failed");

                // optimistic local update
                setPasswordArray(prev => [...prev, payload]);
                toast.success("Password saved!");
            }

            // reset form
            setForm({ site: "", username: "", password: "" });
            // reset input type to password and eye icon
            if (passwordRef.current) passwordRef.current.type = "password";
            if (eyeRef.current) eyeRef.current.src = "icons/eye.png";
        } catch (err) {
            console.error("savePassword error:", err);
            toast.error("Error: Password not saved.");
        } finally {
            setLoading(false);
        }
    };

    const deletePassword = async (id) => {
        if (!id) {
            toast.error("Invalid id for deletion");
            return;
        }
        const confirmed = window.confirm("Do you really want to delete this password?");
        if (!confirmed) return;

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Delete failed");

            setPasswordArray(prev => prev.filter(item => item.id !== id));
            toast.success("Password deleted!");
        } catch (err) {
            console.error("deletePassword error:", err);
            toast.error("Unable to delete password");
        } finally {
            setLoading(false);
        }
    };

    // populate form for edit
    const editPassword = (id) => {
        const item = passwordArray.find(i => i.id === id);
        if (!item) return;
        setForm({ ...item });
        // autofocus password input maybe
        if (passwordRef.current) passwordRef.current.focus();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(150%_150%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(251,191,36,0.15)_0%,rgba(255,255,255,0)_100%)]"></div>

            <div className="p-3 md:container px-40 py-16 mx-auto min-h-[88.2vh]">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative w-full md:w-auto">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                            />
                            <span
                                className="absolute right-[3px] top-[4px] cursor-pointer"
                                onClick={showPassword}
                                role="button"
                                aria-label="Toggle password visibility"
                            >
                                <img ref={eyeRef} className="p-1" width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    {/* <button
                        onClick={savePassword}
                        type="button"
                        className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900 disabled:opacity-50"
                        disabled={loading}
                    >
                        <span className="sr-only">Save</span>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        {form.id ? "Update" : "Save"}
                    </button> */}

                    <button onClick={savePassword} type='button' className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-12 py-1 my-1 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords mt-4">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {loading && passwordArray.length === 0 && <div>Loading...</div>}
                    {passwordArray.length === 0 && !loading && <div>No passwords to show</div>}

                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span>{"*".repeat(item.password.length)}</span>
                                               <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="justify-center py-2 border border-white text-center">
                                            <button className="mx-1" onClick={() => editPassword(item.id)} aria-label="Edit">
                                                {/* edit icon */}
                                                <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            </button>
                                            <button className="mx-1" onClick={() => deletePassword(item.id)} aria-label="Delete">
                                                {/* delete icon */}
                                                <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
