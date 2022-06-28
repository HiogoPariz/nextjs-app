import Link from 'next/link'
import { useRouter } from 'next/router'
import { getClientByName, getClientsList } from '../../../services'

export default function Categoria({ category }) {
  const { asPath } = useRouter()
  return (
    <div>
      <h1>categoria {category?.name}</h1>
      <ul>
        {category?.content.map((c) => (
          <li key={c.name}>
            <Link href={`${asPath}/${c.name}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticPaths() {
  const clients = await getClientsList()
  const category = await Promise.all(
    clients.map(async (site) => {
      const config = await getClientByName(site)
      return config.category.map((category) => ({
        params: { categoria: category.path, site },
      }))
    })
  )

  const paths = category.flat(1)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(ctx) {
  const config = await getClientByName(ctx.params.site)
  const category = config.category.find((c) => c.path === ctx.params.categoria)

  return {
    props: {
      category,
    },
  }
}
