import { useCatch, Link, json, useLoaderData } from 'remix'
import type { LoaderFunction, MetaFunction } from 'remix'
import request, { gql } from 'graphql-request'

const GET_COURSES = gql`
  query {
    courses {
      id
      name
    }
  }
`

export let loader: LoaderFunction = async () => {
  const data = await request('http://localhost:3001/graphql', GET_COURSES)
  return data
}

export default function ParamDemo() {
  let data = useLoaderData()
  return (
    <>
      <h1>The param is</h1>
      <pre>{JSON.stringify(data)}</pre>
    </>
  )
}
