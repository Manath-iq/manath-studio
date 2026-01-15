import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isPointer, setIsPointer] = useState(false);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the cursor (32px width / 2)
            cursorY.set(e.clientY - 16);
        };

        const checkPointer = () => {
            // Check if hovering over a clickable element
            const target = document.querySelector(':hover');
            if (target) {
                const computed = window.getComputedStyle(target);
                if (computed.cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON') {
                    setIsPointer(true);
                } else {
                    setIsPointer(false);
                }
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', checkPointer);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', checkPointer);
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices
    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
        return null;
    }

    return (
        <motion.div
            className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block`}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isPointer ? 2.5 : 1,
                backgroundColor: isPointer ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
            }}
            transition={{
                scale: { duration: 0.2 },
                backgroundColor: { duration: 0.2 }
            }}
        />
    );
};
