import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout, RichStyle, styled } from '../../support/stitches.config';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrowBack, IconPlayerPlay } from '@tabler/icons';
import { Moment } from 'moment';
import { AmsIcon } from '../icon';
import { DefinedTransition } from '../../support/transition';

const waitTimeBeforeInput: number = 2;
const durationPerCharacter: number = 0.5;
const delayPerWord: number = 2.3;

export const SimulationContainer = styled('div', {
  width: '100%',
  height: 240,
  position: 'relative',
  backgroundColor: '$mauveA1',
  borderRadius: '$lg',
  border: '1px solid $mauve3',
  userSelect: 'none',
  overflow: 'hidden',
  '@sm': {
    height: 310,
  },
});

export const StepContainer = styled(motion.div, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  padding: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$3xl',
  fontWeight: 600,
  letterSpacing: '$text',
  color: '$mauve12',
  '@sm': {
    fontSize: '$4xl',
  },
});

export const InputContainer = styled(motion.div, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$2xl',
  fontWeight: 400,
  letterSpacing: '$text',
  color: '$mauve12',
});

export const InputContent = styled('div', {
  height: '100%',
  position: 'relative',
  fontSize: '$lg',
  fontWeight: 400,
  color: '$mauve12',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const InputLabel = styled('div', {
  position: 'absolute',
  bottom: 'calc(100% + 10px)',
  left: 0,
  overflowY: 'clip',
  fontSize: '$xs',
  fontWeight: 500,
  color: '$mauveA10',
  padding: '6px 0',
  whiteSpace: 'nowrap',
});

export const EnterButton = styled(motion.div, {
  width: 72,
  height: 38,
  position: 'absolute',
  left: '50%',
  bottom: 32,
  transform: 'translateX(-50%)',
  borderRadius: '$base',
  backgroundColor: '$mauveA3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@sm': {
    bottom: 50,
  },
});

export type InputItemObject = {
  content: string;
  label: string;
  trailingSpace?: boolean;
};

type SimulationProps = {
  css?: RichStyle;
  text: string;
  slogan?: string;
  inputs: InputItemObject[];
  targetMoment: Moment;
};

export function Simulation({
  css,
  text,
  slogan = 'Yes, it\'s that fast.',
  inputs,
  targetMoment: targetMomentProps,
}: SimulationProps) {
  const [step, setStep] = useState<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const targetMoment = useMemo<Moment>(() => targetMomentProps, [targetMomentProps]);
  const inputItems = useMemo<InputItemObject[]>(() => inputs, [inputs]);

  function stepTimer(to: number, after: number = 0, onFinish: () => void = () => {}) {
    timeout.current = setTimeout(() => {
      setStep(to);
      onFinish();
    }, after * 1000);
  }

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return (
    <SimulationContainer
      css={css}
    >
      <AnimatePresence>
        {step === 0 && (
          <StepContainer
            key={'step-0'}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.4,
                duration: 0.6,
              },
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Layout
              className={'start-animation-div'}
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 14,
                cursor: 'pointer',
                transition: DefinedTransition.cubic(),
                color: '$mauve12',
                fontSize: '$3xl',
                fontWeight: 600,
                letterSpacing: '$text',
                '@sm': {
                  fontSize: '$4xl',
                  '&:hover': {
                    color: '$primary',
                  },
                },
                '&:active': {
                  color: '$primary',
                  transform: 'scale(0.95)',
                },
              }}
              onClick={() => setStep(1)}
            >
              <span>{text}</span>
              <Layout
                css={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  borderRadius: 999,
                  backgroundColor: '$mauveA4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: DefinedTransition.cubic(),
                  '@sm': {
                    '.start-animation-div:hover &': {
                      backgroundColor: '$primary',
                      '& .icon': {
                        color: '$white',
                        fill: '$white',
                      },
                    },
                  },
                  '.start-animation-div:active &': {
                    backgroundColor: '$primary',
                    '& .icon': {
                      color: '$white',
                      fill: '$white',
                    },
                  },
                  '& .icon': {
                    width: 14,
                    height: 14,
                    strokeWidth: 4,
                    color: '$mauve9',
                    fill: '$mauve9',
                    transition: DefinedTransition.cubic(),
                  },
                }}
              >
                <IconPlayerPlay />
              </Layout>
            </Layout>
          </StepContainer>
        )}
        {(step > 0 && step < 6) && (
          <InputContainer
            key={'input-box'}
            initial={{
              opacity: 0,
              x: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Layout
              css={{
                width: '90%',
                maxWidth: 300,
                position: 'relative',
                borderRadius: '$base',
                backgroundColor: '$mauve2',
                border: '1px solid $mauveA3',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 10,
              }}
            >
              {step < 4 ? inputItems.map(({ content, label, trailingSpace }, outerIndex) => (
                <InputContent
                  key={outerIndex}
                  css={{
                    marginRight: trailingSpace && outerIndex !== inputItems.length - 1 ? 8 : 0,
                  }}
                >
                  <InputLabel>
                    <motion.div
                      animate={{
                        opacity: [0, 1, 1, 1, 0],
                        y: [40, 0, 0, 0, 40],
                      }}
                      transition={{
                        delay: waitTimeBeforeInput + outerIndex * delayPerWord - 0.6,
                        duration: durationPerCharacter * content.length + (delayPerWord - 1.2) + 0.1 * (content.length - 1),
                      }}
                      onAnimationComplete={() => {
                        if (outerIndex === inputItems.length - 1) {
                          setStep(2);
                          stepTimer(3, 0.5);
                        }
                      }}
                    >
                      {label}
                    </motion.div>
                  </InputLabel>
                  {content.split('').map((char, innerIndex) => (
                    <motion.span
                      key={innerIndex}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: waitTimeBeforeInput + innerIndex * 0.1 + outerIndex * delayPerWord,
                        duration: durationPerCharacter,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </InputContent>
              )) : (
                <>
                  <InputLabel
                    css={{
                      bottom: '100%',
                      color: '$primary',
                      fontSize: '$sm',
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 1,
                        duration: 0.5,
                      }}
                    >
                      Boom! You are all set.
                    </motion.div>
                  </InputLabel>
                  <InputContent>
                    {/* For animation purpose only. The core algorithm uses JavaScript Date rather than moment. */}
                    {targetMoment.format('MM/DD/YYYY hh:mm a')}
                  </InputContent>
                </>
              )}
            </Layout>
          </InputContainer>
        )}
        {(step >= 2 && step <= 4) && (
          <EnterButton
            key={'enter-button'}
            initial={{
              x: '-50%',
              opacity: 0,
            }}
            animate={step === 3 || step === 4 ? {
              x: '-50%',
              scale: [1, 0.85, 1],
              opacity: 1,
            } : {
              x: '-50%',
              opacity: 1,
            }}
            exit={{
              x: '-50%',
              opacity: 0,
            }}
            onAnimationStart={() => {
              if (step === 3) {
                stepTimer(4, 0.3, () => {
                  stepTimer(5, 0.2, () => {
                    stepTimer(6, 5.0);
                  });
                });
              }
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <IconArrowBack
              width={22}
              height={22}
              strokeWidth={2}
              style={{
                marginTop: -1,
                marginLeft: -1,
              }}
            />
          </EnterButton>
        )}
        {step === 6 && (
          <StepContainer
            key={'step-6'}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 1.2,
                duration: 0.6,
              },
            }}
            exit={{
              opacity: 0,
            }}
            onAnimationStart={() => {
              stepTimer(7, 2.8);
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {slogan}
          </StepContainer>
        )}
        {(step === 7 || step === 8) && (
          <StepContainer
            key={'step-7'}
            initial={{
              opacity: 0,
            }}
            animate={step === 7 ? {
              opacity: 1,
              transition: {
                delay: 1.4,
                duration: 0.6,
              },
            } : {
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            onAnimationStart={() => {
              if (step === 7) {
                stepTimer(8, 4, () => {
                  stepTimer(0, 1.5);
                });
              }
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <AmsIcon
              viewBox={'0 0 398 214'}
              css={{
                width: 50,
                height: 42,
                '& rect, & path': {
                  stroke: '$mauve12 !important',
                },
              }}
            />
          </StepContainer>
        )}
      </AnimatePresence>
    </SimulationContainer>
  );
}
