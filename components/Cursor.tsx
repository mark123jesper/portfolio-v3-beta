import {useEffect} from "react";
import {gsap} from "gsap";

const Cursor = () => {
    useEffect(() => {
        const cursor = document.getElementById("custom-cursor");
        const links = document.querySelectorAll('a');
        const buttons = document.querySelectorAll('button');
        const spans = document.querySelectorAll('span');

        const onMouseMove = (event:any) => {
            const {clientX, clientY} = event;
            gsap.to(cursor, {x: clientX, y: clientY})
        }

        const onMouseEnter = (event:any) => {
            const component = event.target;
            gsap.to(cursor, {scale:4})
        }

        const onMouseLeave = (event:any) => {
            gsap.to(cursor, {scale:1})
        }

        document.addEventListener('mousemove', onMouseMove);
        links.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnter);
            link.addEventListener('mouseleave', onMouseLeave);
        })
        buttons.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnter);
            link.addEventListener('mouseleave', onMouseLeave);
        })
        spans.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnter);
            link.addEventListener('mouseleave', onMouseLeave);
        })
    }, [])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

    if(!isMobile) {
        return <span id="custom-cursor" className="fixed top-0 left-0 w-[20px] rounded-[50%] pointer-events-none z-[9999] mix-blend-difference dark:mix-blend-difference p-[10px] bg-black dark:bg-white"/>
    }

    return;
};

export default Cursor;
