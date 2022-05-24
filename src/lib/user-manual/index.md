# Get Started

This date picker is a powerful tool. If this is your first time using it, we recommend you to take some time to read through this.

In this date picker, you can select the date and time or type the date and time as same as using other date pickers. You do not have to worry about it if you are not familiar with the following magics. Just use it as you like.

But if you want to make your date-selection experience more quick and comfortable, you can try to use the following features.

**Remember:** You can type whatever you want in this date picker, and probably combine different features together to make a combo. But after typing, you have to press `Enter` (or `return` on Mac) to confirm your selection (no need to do this if you are clicking to select in the popper). If you are not doing so, the system will tell you.

After confirming, you can see the selected date in a readable format, so you can still make sure that you are doing the right thing. Alright, let's see what kind of magics you can do with us!

# Magic Modifier

You can use the magic modifier to quickly select the date and time by thinking it in the most intuitive way.

One modifier is assembled by three parts: **Prefix**, **Amount** and **Unit**. Here are some examples: `+1d` (add a day), `-10h` (subtract 10 hours).

A **Prefix** could be `+` or `-` to indicate the direction of the adjustment. If you want to pick a date (or time) that is in the past (need to subtract some times), you can use the prefix `-`. And if you want to pick a date (or time) that is in the future (need to add some times), you can use the prefix `+`.

The **Amount** is an integer (no decimals allowed) that indicates how many units you want to adjust. For example, `+1d` means add one day, `-10h` means subtract 10 hours. And it could also be like `-90m` to subtract 90 minutes because the amount is not necessary to be less than 60 minutes or 24 hours.

The **Unit** is simply the unit we usually say while describing a time. Available units are `h` for hour, `m` for minute, `s` for second, `y` for year, and `mo` for month.

And, it is possible to append multiple modifiers together (separating with spaces). For example, `+1d -10h` means add one day and then subtract 10 hours.

It is also possible to use the `now` keyword to indicate the current time if you need to.

# Input Supercharge

<!--
TODO: Migrate this section.
-->

# Quick Interval

<!--
TODO: Migrate this section.
-->

# GMT and ISO 8601

<!--
TODO: Migrate this section.
-->
