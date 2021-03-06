import { gql } from '@urql/core'
import { useQuery } from 'urql'
import Link from 'next/link'

const GET_COURSES = gql`
  query {
    courses {
      id
      name
    }
  }
`
const Home = () => {
  const [data] = useQuery({ query: GET_COURSES })
  return (
    <>
      <h1>Home</h1>
      <p>
        <Link href='/app/courses'>
          <a>Courses</a>
        </Link>
      </p>
    </>
  )
}
export default Home
