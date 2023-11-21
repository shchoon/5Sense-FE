import React from 'react'

const CalendarCss = () => {
  return <style>{css}</style>
}
export default CalendarCss

const css = `
.react-datepicker__header {
  text-align: center;
  background-color: #ffffff;
  border-bottom: 1px solid #aeaeae;
  border-top-left-radius: 0.3rem;
  padding: 8px 0;
  position: relative;
}

.react-datepicker__current-month{
  text-align: center;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 18px */
}

.react-datepicker__month-container {
  width:268px;
}

.react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover,
.react-datepicker__month-text--selected:hover,
.react-datepicker__month-text--in-selecting-range:hover,
.react-datepicker__month-text--in-range:hover,
.react-datepicker__quarter-text--selected:hover,
.react-datepicker__quarter-text--in-selecting-range:hover,
.react-datepicker__quarter-text--in-range:hover,
.react-datepicker__year-text--selected:hover,
.react-datepicker__year-text--in-selecting-range:hover,
.react-datepicker__year-text--in-range:hover {
  background-color: #563AC0;
  color:#fff
}

.react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--in-range),
  .react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--in-range),
  .react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--in-range),
  .react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--in-range) {
    background-color: #F8FAFD;
  color: #111928;
  }

.react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range,
.react-datepicker__month-text--selected,
.react-datepicker__month-text--in-selecting-range,
.react-datepicker__month-text--in-range,
.react-datepicker__quarter-text--selected,
.react-datepicker__quarter-text--in-selecting-range,
.react-datepicker__quarter-text--in-range,
.react-datepicker__year-text--selected,
.react-datepicker__year-text--in-selecting-range,
.react-datepicker__year-text--in-range {
  background-color: #F8FAFD;
  color: #111928;
}
.react-datepicker__day--selected{
  background-color: #563AC0;
  color:#fff
}
`
