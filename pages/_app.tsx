import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import {AnimatePresence, motion} from "framer-motion";
import {Rubik} from "next/font/google";
import {usePathname} from "next/navigation";
import {ThemeProvider} from "next-themes";

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
                  <ThemeSwitcher />
                  <AnimatePresence mode="wait" initial={false}>
                          <motion.div key={pathname}>
                              <Component {...pageProps} />
                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen bg-shade-4 dark:bg-shade-6 origin-left"
                                  initial={{ scaleX: 0}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 1}}
                                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                  key="enter-1"
                              ></motion.div>

                              <motion.div
                                  className="fixed z-[50] top-0 left-0 w-full h-screen bg-shade-4 dark:bg-shade-6 origin-left"
                                  initial={{ scaleX: 1}}
                                  animate={{scaleX: 0}}
                                  exit={{scaleX: 0}}
                                  transition={{ duration: 1, ease: [0.66, 1, 0.36, 0.22] }}
                                  key="exit-1"
                              ></motion.div>
                          </motion.div>
                  </AnimatePresence>
                  <ScrollToTop/>
                  <DynamicBottomNavbar/>
              </ThemeProvider>
          </main>
      </>
  )
}
