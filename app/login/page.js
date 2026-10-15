"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
const router = useRouter();

const [form, setForm] = useState({
    email: "",
    password: "",
});

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
        const res = await axios.post(
            "http://localhost:8100/api/admin/login",
            {
                email: form.email.trim().toLowerCase(),
                password: form.password,
            }
        );

        const token = res.data?.token;

        if (!token) {
            alert("Login response mein token nahi mila.");
            return;
        }

        localStorage.setItem("adminToken", token);

        if (localStorage.getItem("adminToken") !== token) {
            alert("Token browser mein save nahi hua.");
            return;
        }

        alert("Login successful!");

        router.push("/");
    } catch (error) {
        console.error(
            "Login error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Login failed. Backend server check karo."
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.badge}>
                    Welcome Back
                </span>

                <h1 className={styles.title}>
                    Login
                </h1>

                <p className={styles.subtitle}>
                    Enter your details below to continue
                </p>
            </div>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Email Address
                    </label>

                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="admin@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            autoComplete="username"
                            required
                        />
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Password
                    </label>

                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <div className={styles.footer}>
                <span>Don't have an account?</span>

                <button
                    type="button"
                    className={styles.signupBtn}
                    onClick={() => router.push("/signup")}
                >
                    Sign Up
                </button>
            </div>
        </div>
    </div>
);

}