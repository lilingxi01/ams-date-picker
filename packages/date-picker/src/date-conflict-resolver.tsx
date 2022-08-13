import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { isInDaylightSavingConflictTime } from '../../headless/src/processor.js';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { Layout } from '../../support/stitches.config';

// TODO: rebuild entire headful package based on headless package.

// const AmsDateConflictResolverOption = ({
//   option,
//   design,
// }) => {
//   const { dateState, options } = useContext(DSCRContext);
//   const OptionComponent = option;
//   const optionName = option.OPTION_NAME ?? 'unknown';
//   const optionOffset = options && options[optionName];
//   const [isActive, setIsActive] = useState(false);
//   useEffect(() => {
//     if (dateState && options[optionName] === dateState.getTimezoneOffset()) {
//       setIsActive(true);
//     } else {
//       setIsActive(false);
//     }
//   }, [dateState, options]);
//   const displayTime = dateState.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
//   return (
//     <OptionComponent
//       css={{
//         width: '50%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         rowGap: 2,
//         padding: 6,
//         borderRadius: 7,
//         userSelect: 'none',
//         cursor: 'pointer',
//         color: isActive
//           ? '$mauve12'
//           : '$mauve11',
//         backgroundColor: isActive
//           ? '$white'
//           : '$mauve3',
//         border: isActive
//           ? `0.5px solid ${design?.accentColor ?? '$mauve5'}`
//           : '0.5px solid $mauve4',
//         boxShadow: isActive
//           ? '$md'
//           : 'none',
//         '&:hover': {
//           backgroundColor: isActive
//             ? '$white'
//             : '$mauve1',
//           border: `0.5px solid ${design?.accentColor ?? '$mauve5'}`,
//         },
//         '&:active': {
//           backgroundColor: isActive
//             ? '$white'
//             : '$mauve2',
//         },
//       }}
//     >
//       <Layout
//         css={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '6px 0 10px 0',
//           fontSize: '$base',
//           fontWeight: '500',
//         }}
//       >
//         <IconCheck
//           width={16}
//           height={16}
//           strokeWidth={2.5}
//           style={{
//             marginTop: 1,
//             marginLeft: isActive ? -1 : 0,
//             marginRight: isActive ? 3 : 0,
//             opacity: isActive ? 1 : 0,
//             width: isActive ? 16 : 0,
//           }}
//         />
//         <span>
//           {optionName === 'earlier' ? 'Earlier' : 'Latter'}
//         </span>
//       </Layout>
//       <Layout
//         css={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           '@md': {
//             flexDirection: 'row',
//             alignItems: 'flex-end',
//             justifyContent: 'space-between',
//           },
//           padding: '0 3px',
//         }}
//       >
//         <Layout
//           css={{
//             fontSize: '$base',
//             fontWeight: '400',
//             letterSpacing: '-0.01em',
//           }}
//         >
//           {displayTime}
//         </Layout>
//         <Layout
//           css={{
//             color: '$mauve9',
//             fontSize: '$xxs',
//             fontWeight: '500',
//             paddingBottom: 1,
//           }}
//         >
//           {optionOffset ? `UTC${optionOffset / -60}` : ''}
//         </Layout>
//       </Layout>
//     </OptionComponent>
//   );
// };
//
// export const AmsDateConflictResolver = ({ date, onChange, design }) => {
//   return (
//     <DSCRModule.Root
//       style={{
//         width: '100%',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: design?.cornerRadius ?? '12px',
//         backgroundColor: '$mauve2',
//         border: `0.5px solid $mauve5`,
//         overflow: 'hidden',
//       }}
//       date={date}
//       onChange={onChange}
//     >
//       <Layout
//         css={{
//           width: '100%',
//           fontSize: '$xs',
//           fontWeight: '500',
//           padding: '10px 11px',
//           color: '$mauve9',
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           columnGap: 6,
//         }}
//       >
//         <IconAlertCircle
//           width={14}
//           height={14}
//           strokeWidth={2}
//         />
//         <span>Potential DLS Conflict</span>
//       </Layout>
//       <div
//         style={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'row',
//           padding: '0 7px 7px 7px',
//           columnGap: 7,
//         }}
//       >
//         <AmsDateConflictResolverOption
//           option={DSCRModule.EarlierOption}
//           design={design}
//         />
//         <AmsDateConflictResolverOption
//           option={DSCRModule.LatterOption}
//           design={design}
//         />
//       </div>
//     </DSCRModule.Root>
//   );
// };
