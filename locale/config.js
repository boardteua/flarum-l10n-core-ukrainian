// Ukrainian [ua]

const monthFormat = 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
const monthStandalone = 'Січень_Лютий_Березень_Квітень_Травень_Червень_Липень_Серпень_Вересень_Жовтень_Листопад_Грудень'.split('_')

const monthShortFormat = 'січ_лют_бер_кві_тра_чер_лип_сер_вер_жов_лис_гру'.split('_')
const monthShortStandalone = 'Січ_Лют_Бер_Кві_Тра_Чер_Лип_Сер_Вер_Жов_Лис_Гру'.split('_')

const MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/

function plural(word, num) {
  const forms = word.split('_')
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]) // eslint-disable-line
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
  const format = {
    mm: withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
    hh: 'година_гидини_годин',
    dd: 'день_дня_днів',
    MM: 'місяць_місяця_місяців',
    yy: 'рік_року_років'
  }
  if (key === 'm') {
    return withoutSuffix ? 'хвилина' : 'хвилин'
  }

  return `${number} ${plural(format[key], +number)}`
}
const months = (dayjsInstance, format) => {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()]
  }
  return monthStandalone[dayjsInstance.month()]
}
months.s = monthStandalone
months.f = monthFormat

const monthsShort = (dayjsInstance, format) => {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthShortFormat[dayjsInstance.month()]
  }
  return monthShortStandalone[dayjsInstance.month()]
}
monthsShort.s = monthShortStandalone
monthsShort.f = monthShortFormat

const locale = {
  name: 'ua',
  weekdays: 'Неділя_Понеділок_Вівторок_Середа_Четвер_П\'ятниця_Субота'.split('_'),
  weekdaysShort: 'Ндл_Пнд_Втр_Срд_Чтв_Птн_Сбт'.split('_'),
  weekdaysMin: 'Нд_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months,
  monthsShort,
  weekStart: 1,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY в HH:mm',
    LLLL: 'dddd, D MMMM YYYY в HH:mm'
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'декілька секунд',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'година',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'місяц',
    MM: relativeTimeWithPlural,
    y: 'рік',
    yy: relativeTimeWithPlural
  },
  ordinal: n => n
}

dayjs.locale(locale, null, false)
