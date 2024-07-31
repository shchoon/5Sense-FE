import { redirect } from 'next/navigation'

export default function MainPage() {
  const testData = [1, 2, 3, 4, 5]
  return (
    <div className="flex flex-col gap-2">
      {testData.map((data, i) => {
        return (
          <div key={i}>
            <span>{data}</span>
          </div>
        )
      })}
    </div>
  )
}
