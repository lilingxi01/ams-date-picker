import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { isInDaylightSavingConflictTime } from './support/date-picker-processor.js';
import { IconAlertTriangle, IconCheck } from '@tabler/icons';
import { AmsDesign } from './utils/standards.js';

/* -----------------------------------------------------------------------------
 * Ams Date Conflict Resolver
 * ---------------------------------------------------------------------------*/

const AmsDateConflictResolverOption = ({
  option,
  design,
}) => {
  const { dateState, options } = useContext(DSCRContext);
  const OptionComponent = option;
  const optionName = Option.OPTION_NAME ?? 'unknown';
  const isActive = dateState && options[optionName] === dateState.getTimezoneOffset();
  const displayTime = dateState.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <OptionComponent
      style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '2px',
        padding: '6px',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: '2px',
          fontSize: 12,
          color: isActive
            ? AmsDesign.color.white
            : (design?.accentColor ?? AmsDesign.color.accentColor),
          fontWeight: '500',
        }}
      >
        <IconCheck
          width={13}
          height={13}
          strokeWidth={2.8}
          style={{
            marginTop: '1px',
            display: isActive
              ? 'block'
              : 'none',
          }}
        />
        <span>
          {optionName === 'ams-dscr-earlier-option' ? 'Earlier' : 'Latter'}
        </span>
      </div>
      <div
        style={{
          fontSize: 15,
          color: isActive ? AmsDesign.color.white : AmsDesign.color.black,
          fontWeight: '500',
        }}
      >
        {displayTime}
      </div>
      <div
        style={{
          fontSize: 12,
          color: isActive ? AmsDesign.color.white : AmsDesign.color.black,
          fontWeight: '500',
          opacity: isActive ? 0.70 : 0.55,
        }}
      >
        {options && options[optionName] ? `UTC${options[optionName] / -60}` : 'Unknown'}
      </div>
    </OptionComponent>
  );
};

export const AmsDateConflictResolver = ({ date, onChange, design }) => {
  return (
    <AmsDSCRModule.Root
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      date={date}
      onChange={onChange}
    >
      <div
        style={{
          width: '100%',
          fontSize: 12,
          fontWeight: '500',
          padding: '6px 8px',
          color: AmsDesign.color.gray[500],
          borderBottom: `1px solid ${AmsDesign.color.gray[150]}`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          columnGap: '4px',
        }}
      >
        <IconAlertTriangle
          width={13}
          height={13}
          strokeWidth={2.5}
          style={{
            marginTop: '1px',
          }}
        />
        <span>Potential DLS Conflict</span>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <AmsDateConflictResolverOption option={AmsDSCRModule.EarlierOption} />
        <AmsDateConflictResolverOption option={AmsDSCRModule.LatterOption} />
      </div>
    </AmsDSCRModule.Root>
  );
};

/* -----------------------------------------------------------------------------
 * Ams DSCR Module
 * ---------------------------------------------------------------------------*/

const DSCRContext = React.createContext('ams-dscr');

const DSCRRootContainer = styled(DSCRContext.Provider, {});

const DSCROptionContainer = styled('div', {});

const DSCRRoot = ({ date, onChange, style, children, ...props }) => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const earlierOption = useRef(null);
  const latterOption = useRef(null);

  useEffect(() => {
    if (date && isInDaylightSavingConflictTime(date)) {
      setShouldAppear(true);
      // Parse the date to get the earlier options.
      earlierOption.current = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1,
        12,
      ).getTimezoneOffset();
      // Parse the date to get the latter options.
      latterOption.current = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
      ).getTimezoneOffset();
    } else {
      setShouldAppear(false);
    }
  }, [date]);

  const getDateBasedOnOptionIndex = (optionIndex) => {
    const newDate = date ? new Date(date) : new Date();
    const timezoneOffset = optionIndex === 0
      ? earlierOption.current
      : latterOption.current;
    newDate.setTime(
      newDate.getTime()
      + (timezoneOffset - newDate.getTimezoneOffset()) * 60 * 1000
    );
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <DSCRRootContainer
      css={{
        display: shouldAppear ? 'flex' : 'none',
        ...style,
      }}
      value={{
        dateState: date,
        options: [earlierOption, latterOption],
        onOptionClick: (optionIndex) => {
          getDateBasedOnOptionIndex(optionIndex);
        },
      }}
      {...props}
    >
      {children}
    </DSCRRootContainer>
  );
};

const DSCROption = ({ index, onClick, children, style, ...props }) => {
  const { dateState, onOptionClick } = useContext(DSCRContext);

  return (
    <DSCROptionContainer
      css={style}
      onClick={() => {
        onOptionClick(index);
        if (onClick) {
          onClick();
        }
      }}
      {...props.filter((key) => !['index', 'css', 'style'].includes(key))}
    >
      {children ?? dateState.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </DSCROptionContainer>
  );
};

const DSCREarlierOption = (props) => (
  <DSCROption index={0} {...props} />
);
DSCREarlierOption.OPTION_NAME = 'ams-dscr-earlier-option';

const DSCRLatterOption = (props) => (
  <DSCROption index={1} {...props} />
);
DSCRLatterOption.OPTION_NAME = 'ams-dscr-latter-option';

export const AmsDSCRModule = {
  Root: DSCRRoot,
  EarlierOption: DSCREarlierOption,
  LatterOption: DSCRLatterOption,
};
