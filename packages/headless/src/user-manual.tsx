import React from 'react';

const GetStarted = () => (
  <>
    <p>
      Ams Date Picker is a powerful tool. If this is your first time using it, we recommend you to take some time to read through this.
    </p>
    <p>
      In this date picker, you can select the date and time or type the date and time as same as using other date pickers.
      You do not have to worry about it if you are not familiar with the following magics. Just use it as you like.
    </p>
    <p>
      But if you want to make your date-selection experience quicker and more comfortable, you can try to use the following features.
    </p>
    <p>
      <b>Remember:</b> You can type whatever you want in this date picker, and probably combine different features together to make a combo.
      But after typing, you have to press <span className={'kb-action'}>enter</span> (or <span className={'kb-action'}>return</span> on Mac)
      to confirm your selection (no need to do this if you are clicking to select in the popper). If you are not doing so,
      the system will tell you.
    </p>
    <p>
      After confirming, you can see the selected date in a readable format, so you can still make sure that you are doing the right thing.
      Alright, let&apos;s see what kind of magics you can do with Ams Date Picker!
    </p>
  </>
);

const TimeMachine = () => (
  <>
    <p>
      You can use the <b>Time Machine</b> to quickly select the date and time by thinking it in the most intuitive way.
    </p>
    <p>
      One time machine modifier is assembled by three parts: <b>Prefix</b>, <b>Amount</b> and <b>Unit</b>.
      Here are some examples: <code>+1d</code> (add a day), <code>-10h</code> (subtract 10 hours).
    </p>
    <p>
      The <b>Prefix</b> could be <code>+</code> (future) or <code>-</code> (past) to indicate the direction of the adjustment.
    </p>
    <p>
      The <b>Amount</b> is an integer (no decimals allowed) that indicates how many units you want to adjust.
      For example, <code>+1d</code> means add one day, <code>-10h</code> means subtract 10 hours.
      And it could also be like <code>-90m</code> to subtract 90 minutes because the amount is not necessary to be less
      than 60 minutes or 24 hours.
    </p>
    <p>
      The <b>Unit</b> is simply the unit we usually say while describing a time.
      Available units are <code>h</code> for hour, <code>m</code> for minute, <code>s</code> for second, <code>y</code> for year,
      and <code>mo</code> for month.
    </p>
    <p>
      Plus, it is possible to append multiple modifiers together (separating with spaces).
      For example, <code>+1d -10h</code> means add one day and then subtract 10 hours.
    </p>
    <p>
      It is also possible to use the <code>now</code> keyword to indicate the current time if you need to.
    </p>
  </>
);

const InputSupercharge = () => (
  <>
    <p>
      The feature of <b>Input Supercharge</b> is simple: to eliminate the unnecessary input of the date and time.
    </p>
    <p>
      For example, you want to set 9 PM today. In traditional way, you need to input today&apos;s date (e.g. <code>01/01/2022</code>)
      and then <code>9:00:00 PM</code> to set the time. It is very annoying because system already knows today but still requires you to type it.
      Such repeated procedure also happened when you are setting time in the floating date picker (pick date, pick hour, and then pick minute).
    </p>
    <p>
      But with <b>Input Supercharge</b>, you can simply input <code>9 PM</code> (or even <code>9PM</code> without space, <code>9pm</code> without
      uppercase, etc) to set today 9PM. If you do not specify the date, the system will use today&apos;s date.
    </p>
    <p>
      It will also be super easy to specify the date. If you want to set the date to be this year, you can simply type in the month and day
      (e.g. <code>01/01</code>) without the year.
    </p>
    <p>
      And if you want to type in the full date, you can type it in the MM/DD/YYYY format. It is not necessary to type the date and time together.
      It is possible to use a full date with a short time (e.g. <code>01/01/2022 9pm</code>) or a short date with a full time
      (e.g. <code>01/01 9:30:20 PM</code>). What you need to know is how to type in the correct format for each part,
      and then you can append them in the order you want to finish the entire date selection.
    </p>
    <p>
      Want to use <b>Time Machine</b> with <b>Input Supercharge</b>? It is possible. Yesterday 9:30 PM? Just type <code>-1d 9:30 PM</code>,
      hit <span className={'kb-action'}>enter</span>, and it will be done.
    </p>
    <p>
      Oh! You know what? We are not restricting the time format at all! When you want to select 9 PM,
      you can type <code>9 PM</code> with space, <code>9PM</code> without space, or even <code>21:00</code> in 24 hour format.
      All of them will work as expected. Feel unsafe on different formats? Just hit <span className={'kb-action'}>enter</span>,
      and then the final selections will all be shown in the same standard format.
    </p>
  </>
);

const ComputationalDuration = () => (
  <>
    <p>
      By default, the Time Machine of the start date will be based on the current time, and the magic modifier of the end date
      will be based on the start date (or current time if you do not have a start date).
    </p>
    <p>
      The purpose of doing this is to make it easier for you to pick a time range (set an interval). For example, if you want to set
      a one hour interval starting from 9PM yesterday, you can set <code>-1d 9PM</code> for the start date and <code>+1h</code> for the end date.
      The <code>+1h</code> means that you are setting a one hour time range starting from the start date,
      so you do not need to compute the time range manually.
    </p>
    <p>
      But, if you want to modify the time based on the current time, then how can you do that? Well, we have introduced a modifier
      called <code>now</code>, which means the current time. So, if you want to set the end date to be 1 hour before now, not based on the start date,
      you can use <code>now</code> modifier first and then use hour modifier: <code>now -1h</code> (do not forget the space between every modifiers),
      which means subtract one hour from the current time.
    </p>
  </>
);

const CrossTimeZoneSupport = () => (
  <>
    <p>
      We understand that the date format you get might not be readable. Or it is not in the local timezone. No problem!
      We give you last two additional options to make it easier.
    </p>
    <p>
      If you have a time format in <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer">ISO 8601</a>,
      you can simply put it in the input box, hit <span className={'kb-action'}>enter</span>, and you should be good to go.
      For example, <code>2019-01-01T00:00:00Z</code> is a valid ISO 8601 format (in GMT time). <code>2019-01-01T00:00:00+08:00</code> is also a
      valid ISO 8601 format with custom timezone offset at the end. We might not support some variants with additional spaces,
      but it will be easy for you to delete spaces if they have any.
    </p>
    <p>
      Another case is that you are getting a time in GMT timezone from one of your colleagues. However, all date pickers are local-timezone-based,
      so you need to convert it to your local timezone. With the help of <code>gmt</code> modifier, you can do that with ease. For example,
      someone told you the time should be in GMT 01/01/2022 9PM. You have no idea what this is in your local timezone.
      Well, you can simply put <code>gmt 01/01/2022 9PM</code> in the input box, and hit <span className={'kb-action'}>enter</span>.
      The date picker will convert it to your local timezone automatically.
    </p>
  </>
);

export const UserManual = {
  GetStarted,
  TimeMachine,
  InputSupercharge,
  ComputationalDuration,
  CrossTimeZoneSupport,
};
