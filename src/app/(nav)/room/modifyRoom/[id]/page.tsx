import Test from '@/components/test'

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default function ModifyRoom({ params }: { params: { id: string } }) {
  const roomId = params.id
  return <Test id={roomId} />
}
