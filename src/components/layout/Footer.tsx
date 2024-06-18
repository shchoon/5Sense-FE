export default function Footer() {
  const footer = [
    { id: 1, name: '개인정보처리방침' },
    { id: 2, name: '이용약관' },
    { id: 3, name: '팀소개' }
  ]
  return (
    <div className="footer flex w-full h-[52px] mt-12 justify-between">
      <div className="right flex items-center gap-[56px]">
        <span className="text-gray-300 text-xl font-bold font-['Poppins']">5sense</span>
        <span className="text-gray-300 text-sm font-medium leading-[14px]">
          Copyright ⓒ2023 5sense inc, ltd. All rights reserved
        </span>
      </div>
      <div className="left flex items-center">
        {footer.map(item => (
          <span
            key={item.id}
            className="text-gray-300 text-xs font-medium leading-[14px] after:inline-block after:w-px after:h-2.5 after:bg-gray-300 after:mx-4 last:after:content-none"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}
