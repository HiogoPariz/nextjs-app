import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  return <div>item {router.query.item}</div>
}
