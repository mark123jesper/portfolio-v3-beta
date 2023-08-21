"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


export const ThemeSwitcher = () => {
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    const [showBtn, setShowBtn] = useState(true);
    const { setTheme, resolvedTheme } = useTheme();
    const [isDark, setIsDark] = useState<boolean>();


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setShowBtn(false);
            } else {
                setShowBtn(true);
            }
        });
    }, []);

    useEffect(() => {
        resolvedTheme === "light" ? setIsDark(false) : setIsDark(true);
        return () => {};
    }, [resolvedTheme]);

    return (
        <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className={`${showBtn ? 'w-[40px] h-[40px] p-2' : 'w-0 h-0'} fixed top-3 right-3 justify-center text-center rounded-full text-shade-9 bg-shade-1 dark:text-shade-1 dark:bg-shade-9 hover:scale-110 active:rotate-180 duration-200`}>
            {!isDark ? <FontAwesomeIcon icon={faMoon} className={`${showBtn ? '' : 'w-0 h-0'}`} /> : <FontAwesomeIcon icon={faSun} className={`${showBtn ? '' : 'w-0 h-0'}`}/>}
        </button>
    );
};