import { ThemeToggle } from "@/components/ThemeToggle";

export default async function Dashboard() {
  return (
    <div className="flex min-h-screen justify-center items-center gap-8">
      <p>Dashboard</p>
      <ThemeToggle />
    </div>
  )
}