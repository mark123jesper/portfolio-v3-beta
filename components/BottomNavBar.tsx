'use client'
import Link from "next/link";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMicrochip, faListCheck, faHouse } from "@fortawesome/free-solid-svg-icons";
import {usePathname} from "next/navigation";

const BottomNavbar = () => {
    const pathname = usePathname();
    const navlinks = [
        {
            href: '/',
            name: 'Home',
            icon: faHouse
        },
        {
            href: '/skills',
            name: 'Skills',
            icon: faMicrochip
        },
        {
            href: '/projects',
            name: 'Projects',
            icon: faListCheck
        },
    ];

    return (
        <>
            <section className="block md:hidden sticky inset-x-0 bottom-0 z-10 backdrop-blur-[3px]">
                <div className="flex justify-between">
                    {
                        navlinks.map((link) => {
                            const isActive = pathname === link.href

                            return (
                                <Link key={link.name} href={link.href} className={`relative w-full justify-center text-center pt-1 pb-2`}>
                                    {
                                        isActive && (
                                            <motion.span layoutId="mobileActive" className="absolute left-0 bottom-0 block h-[5px] w-full bg-shade-1 dark:bg-shade-9"/>
                                        )
                                    }
                                    <button>
                                        <FontAwesomeIcon icon={link.icon} />
                                        <span className="block text-sm">{link.name}</span>
                                    </button>
                                </Link>
                                    // `${isActive ? 'text-shade-9 bg-shade-1 dark:text-shade-1 dark:bg-shade-9 pointer-events-none' : 'text-shade-1 dark:text-shade-8'}
                            )
                        })
                    }
                </div>
            </section>

            <section className="hidden md:block fixed bottom-[25%] right-3 z-10 backdrop-blur-[3px]">
                <div className="flex flex-col justify-between">
                    {
                        navlinks.map((link) => {
                            const isActive = pathname === link.href

                            return (
                                <Link key={link.name} href={link.href} className={`relative w-full justify-center text-center py-2 pl-1 pr-2`}>
                                    {
                                        isActive && (
                                            <motion.span layoutId="webActive" className="absolute right-0 bottom-0 block h-full w-[5px] bg-shade-1 dark:bg-shade-9"/>
                                        )
                                    }
                                    <button>
                                        <FontAwesomeIcon icon={link.icon} />
                                        <span className="block text-sm">{link.name}</span>
                                    </button>
                                </Link>
                                // `${isActive ? 'text-shade-9 bg-shade-1 dark:text-shade-1 dark:bg-shade-9 pointer-events-none' : 'text-shade-1 dark:text-shade-8'}
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default BottomNavbar;