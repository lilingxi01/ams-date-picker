import React, {useEffect, useState} from 'react';
import {IconBolt, IconHelp, IconInfinity, IconRocket, IconRotateClockwise2, IconWand, IconX} from '@tabler/icons';
import {Modal} from '@mui/material';
import styled from 'styled-components';
import {BPColors, BPDimens, BPStandards} from '../../../../utils/business-process/standards';

const HelperModalOpenButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  cursor: pointer;
  
  &:hover {
    color: ${BPColors.gray[900]};
  }
`;

// The styled div for the helper modal root.
const HelperModalDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  background-color: ${BPColors.white};
  
  overflow: auto;
  
  &:focus {
    outline: none;
  }
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  border: ${BPStandards.border};
  border-radius: ${BPDimens.cornerRadius}px;
  box-shadow: ${BPStandards.shadow};
  
  & .helper-modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    padding: 10px 11px 10px 14px;
    margin: 0 13px;
    border-radius: ${BPDimens.smallRadius}px;
    font-size: 16px;
    font-weight: 500;
    color: ${BPColors.gray[400]};
    transition: all 0.15s ease-in-out;
    &:hover {
      color: ${BPColors.black};
      cursor: pointer;
      background-color: ${BPColors.gray[100]};
    }
  }

  & .helper-modal-content-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
  
  // Helper modal content styles.
  & .helper-modal-content-children {
    line-height: 1.7;

    h1 {
      margin: 0;
      padding: 0;
    }
    
    h2 {
      font-size: 19px;
      font-weight: 500;
      color: ${BPColors.gray[900]};
      margin: 0;
      padding: 0;
    }
    
    p {
      font-size: 17px;
      font-weight: 400;
      color: ${BPColors.gray[900]};
      margin: 0;
      padding: 0;
    }
    
    a {
      color: ${BPColors.brand};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    code {
      font-size: 17px;
      font-weight: 400;
      color: ${BPColors.gray[900]};
      margin: 0 2px;
      padding: 4px 6px;
      background-color: ${BPColors.gray[100]};
      border-radius: ${BPDimens.smallRadius}px;
    }
  }
`;

// The subcomponent for the helper modal content.
const HelperModalContentContainer = ({title, icon, color = BPColors.brand, children}) => {
  const TitleIconComponent = icon;
  return (
    <div className="helper-modal-content-container">
      <div
        style={{
          flexShrink: 0,
          width: 42,
          height: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 45,
          marginRight: 5,
          borderRadius: BPDimens.smallRadius,
          backgroundColor: color + '16', // Fade out the color for background.
        }}
      >
        <TitleIconComponent width={28} height={28} strokeWidth={1.9} color={color}/>
      </div>
      <div
        className='helper-modal-content-children'
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '0px 20px',
          rowGap: '12px',
        }}
      >
        <h1
          style={{
            height: 50,
            paddingBottom: 8,
            fontSize: 42,
            fontWeight: '500',
            lineHeight: 1.0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            color: color,
          }}
        >
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export const DatePickerHelper = ({onOpen, onClose}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen && onOpen) {
      onOpen();
    } else if (!isModalOpen && onClose) {
      onClose();
    }
  }, [isModalOpen, onClose, onOpen]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <HelperModalOpenButton
        onClick={() => setIsModalOpen(true)}
      >
        <IconHelp
          width={16}
          height={16}
          strokeWidth={2.2}
        />
      </HelperModalOpenButton>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        BackdropProps={{
          style: {
            backgroundColor: BPColors.white,
            opacity: 0.65,
          },
        }}
      >
        <HelperModalDiv>
          <div
            style={{
              width: '100%',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: BPColors.gray[50],
              borderBottom: BPStandards.border,
            }}
          >
            <div style={{
              padding: '21px 25px',
              color: BPColors.black,
              fontSize: 20,
              fontWeight: '500',
            }}>
              Shortcut Commands Help
            </div>
            <div
              className="helper-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              <span>Close</span>
              <IconX
                width={22}
                height={22}
                strokeWidth={2.5}
              />
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '35px 20px 35px 20px',
              overflowX: 'hidden',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              rowGap: 30,
            }}
          >
            <HelperModalContentContainer
              title={'Get Started'}
              icon={IconRocket}
              color={'#ea580c'}
            >
              <p>
                This date picker is a powerful tool. If this is your first time using it, we recommend you to take some time to read through this.
              </p>
              <p>
                In this date picker, you can select the date and time or type the date and time as same as using other date pickers. You do not have to worry about it if you are not familiar with the following magics. Just use it as you like.
              </p>
              <p>
                But if you want to make your date-selection experience more quick and comfortable, you can try to use the following features.
              </p>
              <p>
                <b>Remember:</b> You can type whatever you want in this date picker, and probably combine different features together to make a combo. But after typing, you have to press <b>Enter</b> (or <b>Return</b> on Mac) to confirm your selection (no need to do this if you are clicking to select in the popper). If you are not doing so, the system will tell you.
              </p>
              <p>
                After confirming, you can see the selected date in a readable format, so you can still make sure that you are doing the right thing. Alright, let&apos;s see what kind of magics you can do with us!
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer
              title={'Magic Modifier'}
              icon={IconWand}
              color={'#db2777'}
            >
              <p>
                You can use the magic modifier to quickly select the date and time by thinking it in the most intuitive way.
              </p>
              <p>
                One modifier is assembled by three parts: <b>Prefix</b>, <b>Amount</b> and <b>Unit</b>. Here are some examples: <code>+1d</code> (add a day), <code>-10h</code> (subtract 10 hours).
              </p>
              <p>
                A <b>Prefix</b> could be <code>+</code> or <code>-</code> to indicate the direction of the adjustment. If you want to pick a date (or time) that is in the past (need to subtract some times), you can use the prefix <code>-</code>. And if you want to pick a date (or time) that is in the future (need to add some times), you can use the prefix <code>+</code>.
              </p>
              <p>
                The <b>Amount</b> is an integer (no decimals allowed) that indicates how many units you want to adjust. For example, <code>+1d</code> means add one day, <code>-10h</code> means subtract 10 hours. And it could also be like <code>-90m</code> to subtract 90 minutes because the amount is not necessary to be less than 60 minutes or 24 hours.
              </p>
              <p>
                The <b>Unit</b> is simply the unit we usually say while describing a time. Available units are <code>h</code> for hour, <code>m</code> for minute, <code>s</code> for second, <code>y</code> for year, and <code>mo</code> for month.
              </p>
              <p>
                And, it is possible to append multiple modifiers together (separating with spaces). For example, <code>+1d -10h</code> means add one day and then subtract 10 hours.
              </p>
              <p>
                It is also possible to use the <code>now</code> keyword to indicate the current time if you need to.
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer
              title={'Input Supercharge'}
              icon={IconBolt}
              color={'#1d4ed8'}
            >
              <p>
                The feature of <b>Input Supercharge</b> is simple: to eliminate the unnecessary input of the date and time.
              </p>
              <p>
                For example, you want to set 9 PM today. In traditional way, you need to input today&apos;s date (e.g. <code>01/01/2022</code>) and then <code>9:00:00 PM</code> to set the time. It is very annoying because system already knows today but still requires you to type it. Such repeated procedure also happened when you are setting time in the floating date picker (pick date, pick hour, and then pick minute).
              </p>
              <p>
                But with <b>Input Supercharge</b>, you can simply input <code>9 PM</code> (or even <code>9PM</code> without space, <code>9pm</code> without uppercase, etc) to set today 9PM. If you do not specify the date, the system will use today&apos;s date.
              </p>
              <p>
                It will also be super easy to specify the date. If you want to set the date to be this year, you can simply type in the month and day (e.g. <code>01/01</code>) without the year.
              </p>
              <p>
                And if you want to type in the full date, you can type it in the MM/DD/YYYY format. It is not necessary to type the date and time together. It is possible to use a full date with a short time (e.g. <code>01/01/2022 9pm</code>) or a short date with a full time (e.g. <code>01/01 9:30:20 PM</code>). What you need to know is how to type in the correct format for each part, and then you can append them in the order you want to finish the entire date selection.
              </p>
              <p>
                Want to use <b>Magic Modifier</b> with <b>Input Supercharge</b>? It is possible. Yesterday 9:30 PM? Just type <code>-1d 9:30 PM</code>, hit <code>Enter</code>, and it will be done.
              </p>
              <p>
                Oh! You know what? We are not restricting the time format at all! When you want to select 9 PM, you can type <code>9 PM</code> with space, <code>9PM</code> without space, or even <code>21:00</code> in 24 hour format. All of them will work as expected. Feel unsafe on different formats? Just hit <code>Enter</code>, and then the final selections will all be shown in the same standard format.
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer
              title={'Quick Interval'}
              icon={IconRotateClockwise2}
              color={'#059669'}
            >
              <p>
                By default, the magic modifier of the start date will be based on the current time, and the magic modifier of the end date will be based on the start date (or current time if you do not have a start date).
              </p>
              <p>
                The purpose of doing this is to make it easier for you to pick a time range (set an interval). For example, if you want to set a one hour interval starting from 9PM yesterday, you can set <code>-1d 9PM</code> for the start date and <code>+1h</code> for the end date. The <code>+1h</code> means that you are setting a one hour time range starting from the start date, so you do not need to compute the time range manually.
              </p>
              <p>
                But, if you want to modify the time based on the current time, then how can you do that? Well, we have introduced a modifier called <code>now</code>, which means the current time. So, if you want to set the end date to be 1 hour before now, not based on the start date, you can use <code>now</code> modifier first and then use hour modifier: <code>now -1h</code> (do not forget the space between every modifiers), which means subtract one hour from the current time.
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer
              title={'GMT and ISO 8601'}
              icon={IconInfinity}
              color={'#0284c7'}
            >
              <p>
                We understand that the date format you get might not be readable. Or it is not in the local timezone. No problem! We give you last two additional options to make it easier.
              </p>
              <p>
                If you have a time format in <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer">ISO 8601</a>, you can simply put it in the input box, hit <code>Enter</code>, and you should be good to go. For example, <code>2019-01-01T00:00:00Z</code> is a valid ISO 8601 format (in GMT time). <code>2019-01-01T00:00:00+08:00</code> is also a valid ISO 8601 format with custom timezone offset at the end. We might not support some variants with additional spaces, but it will be easy for you to delete spaces if they have any.
              </p>
              <p>
                Another case is that you are getting a time in GMT timezone from one of your colleagues. However, all date pickers are local-timezone-based, so you need to convert it to your local timezone. With the help of <code>gmt</code> modifier, you can do that with ease. For example, someone told you the time should be in GMT 01/01/2022 9PM. You have no idea what this is in your local timezone. Well, you can simply put <code>gmt 01/01/2022 9PM</code> in the input box, and hit <code>Enter</code>. The date picker will convert it to your local timezone automatically.
              </p>
            </HelperModalContentContainer>
          </div>
        </HelperModalDiv>
      </Modal>
    </>
  );
};
