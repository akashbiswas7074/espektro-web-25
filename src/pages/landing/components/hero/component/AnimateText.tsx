
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { letterContainerVariants, letterVariants } from "./AnimationVariants";

const StyledTitleElement = styled(motion.h2)`
font-size: var(--heading-font-size);
font-family: medieval;
font-weight: 700;
color: $light;

transform: translateX(-2rem);

@include media(768px) {
  transform: translateX(-1rem);
}
`;

export const AnimatedTitle = (props: {
  children: string;
  currentInView: boolean;
}) => {
  const { children, currentInView } = props;

  return (
    <AnimatePresence>
      {currentInView && (
        <StyledTitleElement
          {...props}
          variants={letterContainerVariants}
          initial={"before"}
          animate={"after"}
          exit={"before"}
          key={children}
          aria-label={children}
          aria-live={"polite"} 
        >
          {children.split(" ").map((word: string, wordI: number) => (
            <div
              key={`word-${word}-${wordI}`}
              style={{
                display: "inline-block"
              }}
            >
              {Array.from(word).map((letter, index) => (
                <motion.span
                  key={`${index}-${letter}`}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "auto"
                  }} 
                  variants={letterVariants}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              {"\u00A0"}
            </div>
          ))}
        </StyledTitleElement>
      )}
    </AnimatePresence>
  );
};
