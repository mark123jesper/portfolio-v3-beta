import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
const ScrollToTopButton = () => {
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    const [showTopBtn, setShowTopBtn] = useState(false);
    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    return (
        <span className={`${showTopBtn ? 'w-[40px] h-[40px] p-2' : 'w-0 h-0'} fixed bottom-20 md:bottom-5 right-3 justify-center text-center rounded-full text-shade-9 bg-shade-1 dark:text-shade-1 dark:bg-shade-9 hover:scale-110 duration-300`} onClick={scrollToTop}>
            <FontAwesomeIcon className={`${showTopBtn ? '' : 'w-0 h-0'}`} icon={faArrowUp} />
        </span>
    );
}

export default ScrollToTopButton;