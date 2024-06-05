interface IProps {
  title: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export default function TextInput({ title, placeholder, value, onChange }: IProps) {
  return (
    <div className="w-full flex flex-col gap-2.5">
      <span className="text-gray-800 text-base font-semibold leading-normal">{title}</span>
      <input
        placeholder={placeholder}
        value={value}
        className="px-4 py-3.5 bg-white rounded-lg border border-gray-200 justify-start items-center text-gray-900 placeholder:text-gray-400 focus:border-indigo-700 focus-visible:outline-none"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
