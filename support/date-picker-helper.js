import React, {useEffect, useState} from 'react';
import {IconBolt, IconHelp, IconRotateClockwise2, IconWand, IconX} from '@tabler/icons';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen && onOpen) {
      onOpen();
    } else if (!isModalOpen && onClose) {
      onClose();
    }
  }, [isModalOpen]);

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
            <HelperModalContentContainer title={'Magic Modifier'} icon={IconWand} color={'#db2777'}>
              <p>
                You can use the magic modifier to quickly select the date and time by thinking it in the most intuitive way.
              </p>
              <p>
                One modifier is assembled by three parts: <b>Prefix</b>, <b>Amount</b> and <b>Unit</b>. Here are some examples: <code>+1d</code> (add a day), <code>-10h</code> (subtract 10 hours).
              </p>
              <p>
                A <b>prefix</b> could be <code>+</code> or <code>-</code> to indicate the direction of the adjustment. If you want to pick a date (or time) that is in the past (need to subtract some times), you can use the prefix <code>-</code>. And if you want to pick a date (or time) that is in the future (need to add some times), you can use the prefix <code>+</code>.
              </p>
              <p>
                The <b>amount</b> is an integer (no decimals allowed) that indicates how many units you want to adjust. For example, <code>+1d</code> means add one day, <code>-10h</code> means subtract 10 hours. And it could also be like <code>-90m</code> to subtract 90 minutes because the amount is not necessary to be less than 60 minutes or 24 hours.
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer title={'Quick Interval'} icon={IconRotateClockwise2} color={'#059669'}>
              <p>
                This is the most convenient way to &quot;paste&quot; a date and time.
              </p>
              <p>
                To be continued.
              </p>
            </HelperModalContentContainer>
            <HelperModalContentContainer title={'Input Supercharge'} icon={IconBolt} color={'#1d4ed8'}>
              <p>
                This is the most convenient way to &quot;paste&quot; a date and time.
              </p>
              <p>
                To be continued.
              </p>
            </HelperModalContentContainer>
          </div>
        </HelperModalDiv>
      </Modal>
    </>
  );
};
