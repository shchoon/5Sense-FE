import Test from '@/components/test'

export default function ModifyRoom({ params }: { params: { id: string } }) {
  const roomId = params.id
  return <Test id={roomId} />
}
