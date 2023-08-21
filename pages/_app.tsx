import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import {Rubik} from "next/font/google";
import {usePathname} from "next/navigation";
import {ThemeProvider} from "next-themes";

import {AnimatePresence, motion} from "framer-motion";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import ScrollToTop from "@/components/ScrollToTop";
import PageHead from "@/components/PageHead";

const DynamicCursor = dynamic(
    () => import('@/components/Cursor'),
    { ssr: false }
)

const DynamicBottomNavbar = dynamic(
    () => import('@/components/BottomNavBar'),
    { ssr: false }
)
const rubik = Rubik({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
    const pathname = usePathname()

  return (
      <>
          <main className={rubik.className}>
              <ThemeProvider attribute="class">
                  <PageHead/>
                  <DynamicCursor/>
                  <AnimatePresence mode="wait" initial={false}>
                          <motion.div key={pathname}>
                              <motion.div
                                  className="md:w-[95%] w-[85%]"
                                  initial={{ opacity: 0}}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: 0.2 }}
                              >
                                  <ThemeSwitcher />
                                  <Component {...pageProps} />
                                  <ScrollToTop/>
                              </motion.div>
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen dark:bg-shade-2 bg-shade-6 origin-left"
                                  initial={{ scaleX: 0}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 1}}
                                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                  key="enter-1"
                              ></motion.div>
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen dark:bg-shade-3 bg-shade-7 origin-left"
                                  initial={{ scaleX: 0}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 1}}
                                  transition={{ duration: 1, ease: [0.44, 1, 0.36, 1] }}
                                  key="enter-2"
                              ></motion.div>
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen dark:bg-shade-4 bg-shade-8 origin-left"
                                  initial={{ scaleX: 0}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 1}}
                                  transition={{ duration: 1, ease: [0.66, 1, 0.36, 1] }}
                                  key="enter-3"
                              ></motion.div>

                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen bg-shade-6 dark:bg-shade-2 origin-left"
                                  initial={{ scaleX: 1}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 0}}
                                  transition={{ duration: 1, ease: [0.66, 1, 0.36, 1] }}
                                  key="exit-1"
                              ></motion.div>
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen bg-shade-7 dark:bg-shade-3 origin-left"
                                  initial={{ scaleX: 1}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 0}}
                                  transition={{ duration: 1, ease: [0.44, 1, 0.36, 1] }}
                                  key="exit-2"
                              ></motion.div>
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen bg-shade-8 dark:bg-shade-4 origin-left"
                                  initial={{ scaleX: 1}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 0}}
                                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                  key="exit-3"
                              ></motion.div>
                          </motion.div>
                  </AnimatePresence>
                  <DynamicBottomNavbar/>
              </ThemeProvider>
          </main>
      </>
  )
}
