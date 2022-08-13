import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { isInDaylightSavingConflictTime } from './processor.js';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { AmsDesign } from '../support/standards.js';
import { Layout } from './layout-support.js';

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
      css={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 2,
        padding: 6,
        borderRadius: 7,
        userSelect: 'none',
        cursor: 'pointer',
        transition: AmsDesign.transition.cubic,
        color: isActive
          ? '$mauve12'
          : '$mauve11',
        backgroundColor: isActive
          ? '$white'
          : '$mauve3',
        border: isActive
          ? `0.5px solid ${design?.accentColor ?? '$mauve5'}`
          : '0.5px solid $mauve4',
        boxShadow: isActive
          ? '$md'
          : 'none',
        '&:hover': {
          backgroundColor: isActive
            ? '$white'
            : '$mauve1',
          border: `0.5px solid ${design?.accentColor ?? '$mauve5'}`,
        },
        '&:active': {
          backgroundColor: isActive
            ? '$white'
            : '$mauve2',
        },
      }}
    >
      <Layout
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 0 10px 0',
          fontSize: '$base',
          fontWeight: '500',
        }}
      >
        <IconCheck
          width={16}
          height={16}
          strokeWidth={2.5}
          style={{
            marginTop: 1,
            marginLeft: isActive ? -1 : 0,
            marginRight: isActive ? 3 : 0,
            transition: AmsDesign.transition.cubic,
            opacity: isActive ? 1 : 0,
            width: isActive ? 16 : 0,
          }}
        />
        <span>
          {optionName === 'earlier' ? 'Earlier' : 'Latter'}
        </span>
      </Layout>
      <Layout
        css={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '@md': {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          },
          padding: '0 3px',
        }}
      >
        <Layout
          css={{
            fontSize: '$base',
            fontWeight: '400',
            letterSpacing: '-0.01em',
          }}
        >
          {displayTime}
        </Layout>
        <Layout
          css={{
            color: '$mauve9',
            fontSize: '$xxs',
            fontWeight: '500',
            paddingBottom: 1,
          }}
        >
          {optionOffset ? `UTC${optionOffset / -60}` : ''}
        </Layout>
      </Layout>
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
        borderRadius: design?.cornerRadius ?? '12px',
        backgroundColor: '$mauve2',
        border: `0.5px solid $mauve5`,
        overflow: 'hidden',
      }}
      date={date}
      onChange={onChange}
    >
      <Layout
        css={{
          width: '100%',
          fontSize: '$xs',
          fontWeight: '500',
          padding: '10px 11px',
          color: '$mauve9',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          columnGap: 6,
        }}
      >
        <IconAlertCircle
          width={14}
          height={14}
          strokeWidth={2}
        />
        <span>Potential DLS Conflict</span>
      </Layout>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          padding: '0 7px 7px 7px',
          columnGap: 7,
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
