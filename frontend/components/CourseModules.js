import { gql } from '@urql/core'
import { useQuery } from 'urql'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const GET_LESSONS = gql`
  query Query($courseId: String!, $moduleId: String!) {
    lessons(id: $courseId, idModule: $moduleId) {
      id
      name
    }
  }
`

const CourseModule = ({ courseModule }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { courseId, moduleId } = router.query
  const [courseLesssons] = useQuery({
    query: GET_LESSONS,
    variables: { courseId, moduleId: courseModule.id },
    pause: !courseId || !isOpen
  })
  return (
    <>
      <h1
        onClick={() => setIsOpen((c) => !c)}
        className='cursor-pointer font-bold text-2xl bg-blue-200 p-4 m-2 rounded'
      >
        {courseModule?.name} [{courseId}]
      </h1>
      {courseLesssons?.fetching && !courseLesssons?.data && <p>Loading...</p>}
      {isOpen && (
        <ul className='p-4 m-2'>
          {courseLesssons?.data &&
            courseLesssons?.data?.lessons?.map((lesson) => (
              <li key={lesson.id}>
                <Link href={`/app/courses/${courseId}/learn/${lesson.id}`}>
                  <a>{lesson.name}</a>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </>
  )
}
export default CourseModule
