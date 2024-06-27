"use client"

interface DateProps {
  date: Date
  locale?: Intl.LocalesArgument
  options?: Intl.DateTimeFormatOptions
}

export default function DateClient({ date, locale, options }: Readonly<DateProps>) {
  const localeDate = date.toLocaleDateString(locale, options)

  return (
    <time className="font-medium" dateTime={date.toISOString()}>
      {localeDate}
    </time>
  )
}
