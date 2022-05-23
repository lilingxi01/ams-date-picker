import React, { useState } from 'react';
import { AmsDateConflictResolver } from '../src/lib/date-conflict-resolver';
import moment from 'moment';

export default function Home() {
  const [date, setDate] = useState(moment('11/07/2021 1:00 AM'));

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AmsDateConflictResolver
        date={date.toDate()}
        onChange={(newDate) => {
          setDate(moment(newDate));
        }}
      />
    </div>
  );
}
