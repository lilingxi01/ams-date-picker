import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { isInDaylightSavingConflictTime } from './processor.js';
import { IconAlertTriangle, IconCheck } from '@tabler/icons';
import { AmsDesign } from '../support/standards.js';

/* -----------------------------------------------------------------------------
 * Ams Daylight Saving Conflict Resolver
 * ---------------------------------------------------------------------------*/

const AmsDateConflictResolverOption = ({
  option,
  design,
}) => {
  const { dateState, options } = useContext(DSCRContext);
  const OptionComponent = option;
  const optionName = option.OPTION_NAME ?? 'unknown';
  const optionOffset = options && options[optionName];
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (dateState && options[optionName] === dateState.getTimezoneOffset()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [dateState, options]);
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
        transition: AmsDesign.transition.cubic,
        backgroundColor: isActive
          ? design?.accentColor ?? AmsDesign.color.accentColor
          : AmsDesign.color.transparent,
        '&:hover': {
          backgroundColor: isActive
            ? design?.accentColor ?? AmsDesign.color.accentColor
            : AmsDesign.color.gray[100],
        },
        '&:active': {
          backgroundColor: isActive
            ? design?.accentColor ?? AmsDesign.color.accentColor
            : AmsDesign.color.gray[200],
        },
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
          {optionName === 'earlier' ? 'Earlier' : 'Latter'}
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
        {optionOffset ? `UTC${optionOffset / -60}` : ''}
      </div>
    </OptionComponent>
  );
};

export const AmsDateConflictResolver = ({ date, onChange, design }) => {
  return (
    <AmsDSCRModule.Root
      style={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: design?.cornerRadius ?? '8px',
        backgroundColor: AmsDesign.color.gray[50],
        border: `1px solid ${AmsDesign.color.gray[150]}`,
        overflow: 'hidden',
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
        <AmsDateConflictResolverOption
          option={AmsDSCRModule.EarlierOption}
          design={design}
        />
        <AmsDateConflictResolverOption
          option={AmsDSCRModule.LatterOption}
          design={design}
        />
      </div>
    </AmsDSCRModule.Root>
  );
};

/* -----------------------------------------------------------------------------
 * Ams DSCR Module
 * ---------------------------------------------------------------------------*/

const DSCRContext = React.createContext('ams-dscr');

const DSCRRootContainer = styled('div', {});

const DSCROptionContainer = styled('div', {});

const DSCRRoot = ({ date, onChange, style, children, ...props }) => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const earlierOption = useRef(0);
  const latterOption = useRef(0);

  useEffect(() => {
    if (date && isInDaylightSavingConflictTime(date)) {
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
      setShouldAppear(true);
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
    <DSCRContext.Provider
      value={{
        dateState: date,
        options: {
          'earlier': earlierOption.current,
          'latter': latterOption.current,
        },
        onOptionClick: (optionIndex) => {
          getDateBasedOnOptionIndex(optionIndex);
        },
      }}
    >
      <DSCRRootContainer
        css={{
          display: shouldAppear ? 'flex' : 'none',
          ...style,
        }}
        {...props}
      >
        {children}
      </DSCRRootContainer>
    </DSCRContext.Provider>
  );
};

const DSCROption = ({ id, index, onClick, children, style, ...props }) => {
  const { dateState, onOptionClick } = useContext(DSCRContext);
  const availableProps = props && Array.isArray(props)
    ? props.filter((key) => !['index', 'css', 'style'].includes(key))
    : props;

  return (
    <DSCROptionContainer
      id={`ams-dscr-option-${id ?? index}`}
      css={style}
      onClick={() => {
        onOptionClick(index);
        if (onClick) {
          onClick();
        }
      }}
      {...availableProps}
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
DSCREarlierOption.OPTION_NAME = 'earlier';

const DSCRLatterOption = (props) => (
  <DSCROption index={1} {...props} />
);
DSCRLatterOption.OPTION_NAME = 'latter';

export const AmsDSCRModule = {
  Root: DSCRRoot,
  EarlierOption: DSCREarlierOption,
  LatterOption: DSCRLatterOption,
};