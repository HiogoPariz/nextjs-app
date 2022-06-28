import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getClientByName, getClientsList } from '../../services'
import { api } from '../../utils/api'

export default function Site({ config }) {
  const { name, category, image } = config
  const { asPath } = useRouter()

  return (
    <>
      <div>
        <h1>{name}</h1>
        <Image
          width="300"
          height="300"
          src={image}
          alt={`${name} - ${category.name} banner`}
        />
        <nav>
          <ul>
            {category.map((category) => (
              <li key={category.name}>
                <Link href={`${asPath}/${category.path}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const clients = await getClientsList()
  const paths = clients.map((site) => ({ params: { site } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(ctx) {
  const config = await getClientByName(ctx.params.site)

  return {
    props: {
      config,
    },
  }
}
