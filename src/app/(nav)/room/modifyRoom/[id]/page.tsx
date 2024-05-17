import Test from '@/components/room/Test'

export function generateStaticParams() {
  return [{ id: '3' }, { id: '4' }]
}

export default function ModifyRoom({ params }: { params: { id: string } }) {
  const roomId = params.id

  return <Test id={roomId} />
}
