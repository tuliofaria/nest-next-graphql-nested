import { gql } from '@urql/core'
import { useQuery } from 'urql'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CourseModule from '../../../../components/CourseModules'

const GET_MODULES = gql`
  query Query($courseId: String!) {
    courseModules(id: $courseId) {
      id
      name
      firstLesson {
        id
        name
      }
    }
  }
`

const GET_COURSE = gql`
  query Course($courseId: String!) {
    course(id: $courseId) {
      id
      name
    }
  }
`

const HomeCourse = () => {
  const router = useRouter()
  const { courseId } = router.query
  const [course] = useQuery({
    query: GET_COURSE,
    variables: { courseId },
    pause: !courseId
  })
  const [courseModules] = useQuery({
    query: GET_MODULES,
    variables: { courseId },
    pause: !courseId
  })
  return (
    <>
      <h1 className='font-bold text-2xl bg-gray-200 p-4 m-2 rounded'>
        Course: {course?.data?.course?.name}
      </h1>
      <div className='p-4 m-2'>
        {courseModules?.data &&
          courseModules?.data?.courseModules?.map((courseModule) => (
            <CourseModule key={courseModule.id} courseModule={courseModule} />
          ))}
      </div>
    </>
  )
}
export default HomeCourse
