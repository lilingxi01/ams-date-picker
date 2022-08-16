import { Layout, RichStyle, styled } from '../../support/stitches.config';
import { Moment } from 'moment/moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DefinedTransition } from '../../support/transition';
import { IconArrowBack, IconPlayerPlay } from '@tabler/icons';
import { AmsIcon } from '../icon';
import {
  EnterButton,
  InputContainer,
  InputContent,
  InputItemObject,
  InputLabel,
  StepContainer,
} from './simulation';

const waitTimeBeforeInput: number = 2;
const durationPerCharacter: number = 0.5;
const delayPerWord: number = 2.3;

const TwoLineSimulationContainer = styled('div', {
  width: '100%',
  height: 260,
  position: 'relative',
  backgroundColor: '$mauveA1',
  borderRadius: '$lg',
  border: '1px solid $mauve3',
  userSelect: 'none',
  overflow: 'hidden',
  '@sm': {
    height: 340,
  },
});

type TwoLineSimulationProps = {
  css?: RichStyle;
  text: string;
  slogan?: string;
  inputs: {
    line1: InputItemObject[];
    line2: InputItemObject[];
  };
  targetMoments: {
    line1: Moment;
    line2: Moment;
  };
};

export function TwoLineSimulation({
  css,
  text,
  slogan = 'Yes, it\'s that fast.',
  inputs,
  targetMoments: targetMomentProps,
}: TwoLineSimulationProps) {
  const [step, setStep] = useState<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const targetMoments = useMemo<Moment[]>(() => [targetMomentProps.line1, targetMomentProps.line2], [targetMomentProps]);
  const inputs1 = useMemo<InputItemObject[]>(() => inputs.line1, [inputs]);
  const inputs2 = useMemo<InputItemObject[]>(() => inputs.line2, [inputs]);

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
    <TwoLineSimulationContainer
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
        {(step > 0 && step < 11) && (
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
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
              {step < 4 ? inputs1.map(({ content, label, trailingSpace }: InputItemObject, outerIndex) => (
                <InputContent
                  key={outerIndex}
                  css={{
                    marginRight: trailingSpace && outerIndex !== inputs1.length - 1 ? 8 : 0,
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
                        if (outerIndex === inputs1.length - 1) {
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
                <InputContent>
                  {/* For animation purpose only. The core algorithm uses JavaScript Date rather than moment. */}
                  {targetMoments[0].format('MM/DD/YYYY hh:mm a')}
                </InputContent>
              )}
            </Layout>
            {step >= 6 && (
              <motion.div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                initial={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  marginTop: 40,
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
                  {step < 9 ? inputs2.map(({ content, label, trailingSpace }: InputItemObject, outerIndex) => (
                    <InputContent
                      key={outerIndex}
                      css={{
                        marginRight: trailingSpace && outerIndex !== inputs2.length - 1 ? 8 : 0,
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
                            if (outerIndex === inputs2.length - 1) {
                              setStep(7);
                              stepTimer(8, 0.5);
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
                          width: '100%',
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
                        {targetMoments[1].format('MM/DD/YYYY hh:mm a')}
                      </InputContent>
                    </>
                  )}
                </Layout>
              </motion.div>
            )}
          </InputContainer>
        )}
        {((step >= 2 && step <= 4) || (step >= 7 && step <= 9)) && (
          <EnterButton
            key={'enter-button'}
            css={{
              bottom: 26,
              '@sm': {
                bottom: 40,
              },
            }}
            initial={{
              x: '-50%',
              opacity: 0,
            }}
            animate={(step >= 3 && step <= 4) || (step >= 8 && step <= 9) ? {
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
                    stepTimer(6, 1.0);
                  });
                });
              } else if (step === 8) {
                stepTimer(9, 0.3, () => {
                  stepTimer(10, 0.2, () => {
                    stepTimer(11, 5.5);
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
        {step === 11 && (
          <StepContainer
            key={'step-11'}
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
              stepTimer(12, 2.8);
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {slogan}
          </StepContainer>
        )}
        {(step === 12 || step === 13) && (
          <StepContainer
            key={'step-12'}
            initial={{
              opacity: 0,
            }}
            animate={step === 12 ? {
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
              if (step === 12) {
                stepTimer(13, 4, () => {
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
    </TwoLineSimulationContainer>
  );
}
