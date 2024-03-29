![AmsDatePicker Cover](https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/d6bffcf4-bee4-4235-de19-b68a0be89800/HD)

![WIP](https://img.shields.io/badge/Headless-0.0.5-blue.svg?style=flat-square) ![WIP](https://img.shields.io/badge/Styled-Work%20in%20progress-red.svg?style=flat-square)

# Get Started

Ams Date Picker (in code known as `AmsDatePicker`) is a powerful date picker component for React. It not only provides a modern look of date/time picker, but also provides a bunch of powerful features to boost the user experience while inputting a date/time.

# WIP ([Roadmap](https://github.com/lilingxi01/ams-date-picker/issues/2))

This project is still **in development**. It is not yet ready for use. We will release it as soon as it is ready. Stay tuned and check back soon!

# Installation

For `npm` user:
```bash
npm install @ams-js/headless
```

For `yarn` user:
```bash
yarn add @ams-js/headless
```

For `pnpm` user:
```bash
pnpm add @ams-js/headless
```

# Usage

For now, we only have Input component available. In the future, we will have Date Selector component and more plugins, which will also be used within `<DatePicker.Root>`.

### Single Date Input (Headless)

```tsx
import * as DatePicker from '@ams-js/headless';

export const MyDatePicker = () => {
  const [dateState, setDateState] = useState<Date | null>(null);
  return (
    <DatePicker.Root
      date={dateState}
      onDateChange={setDateState}
      onError={(error) => console.error(error)}
      dateOptions={{ ... }} // You can customize as JavaScript Date options.
    >
      <DatePicker.Input
        {/* Any <input> prop is allowed */}
      />
    </DatePicker.Root>
  );
};
```

### Range Date Input (Headless)

```tsx
import * as DatePicker from '@ams-js/headless';

export const MyRangeDatePicker = () => {
  const [firstDate, setFirstDate] = useState<Date | null>(null);
  const [secondDate, setSecondDate] = useState<Date | null>(null);
  return (
    <div>
      <DatePicker.Root
        date={firstDate}
        onDateChange={setFirstDate}
        onError={(error) => console.error(error)}
        dateOptions={{ ... }} // You can customize as JavaScript Date options.
      >
        <DatePicker.Input
          {/* Any <input> prop is allowed */}
        />
      </DatePicker.Root>
      <DatePicker.Root
        date={secondDate}
        baseDate={firstDate} // So all modifiers of the second date will be based on the first date.
        onDateChange={setSecondDate}
        onError={(error) => console.error(error)}
        dateOptions={{ ... }} // You can customize as JavaScript Date options.
      >
        <DatePicker.Input
          {/* Any <input> prop is allowed */}
        />
      </DatePicker.Root>
    </div>
  );
};
```

# Design Prototype

![Date Picker Prototype](https://user-images.githubusercontent.com/36816148/169880375-a60d1198-dd6f-4add-ac62-b86d6cc41918.png)

![Date Selector Prototype](https://user-images.githubusercontent.com/36816148/169880433-96701a89-691f-413f-b954-404882d28dbf.png)

![Date Conflict Resolver](https://user-images.githubusercontent.com/36816148/169919720-1828b8d7-0862-4868-abb9-2a89a2170c33.png)

![Date Picker User Manual](https://user-images.githubusercontent.com/36816148/170132516-99c20992-d004-4a4e-b420-b1cfa76e6ca7.png)

![Dark Mode Support](https://user-images.githubusercontent.com/36816148/172277845-26b2d8be-733f-4c50-8655-f4496bcd2f7b.png)

# FAQ

## Why is this project called `AmsDatePicker`?

This project is called `AmsDatePicker` because it was born in Amherst, MA. The original group members are all coming from University of Massachusetts Amherst in [Indigo Development](https://github.com/mbucc/320-S22-Track2/wiki/Indigo).

# Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://lingxi.li"><img src="https://avatars.githubusercontent.com/u/36816148?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lingxi Li</b></sub></a><br /><a href="#design-lilingxi01" title="Design">🎨</a> <a href="https://github.com/lilingxi01/ams-date-picker/commits?author=lilingxi01" title="Code">💻</a> <a href="https://github.com/lilingxi01/ams-date-picker/commits?author=lilingxi01" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/limbo-yan"><img src="https://avatars.githubusercontent.com/u/46770483?v=4?s=100" width="100px;" alt=""/><br /><sub><b>limbo-yan</b></sub></a><br /><a href="https://github.com/lilingxi01/ams-date-picker/commits?author=limbo-yan" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key))!

# Credits

It was originated in project [here](https://github.com/mbucc/320-S22-Track2), but it was now separated and moved to here (keeping all old contributions from Git).
