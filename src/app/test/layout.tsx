export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div>레이아웃</div>
      {children}
    </section>
  )
}
