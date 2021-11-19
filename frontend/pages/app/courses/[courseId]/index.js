import { gql } from "@urql/core";
import { useQuery } from "urql";
import Link from "next/link";

const GET_COURSES = gql`
  query {
    courses {
      id
      name
    }
  }
`;
const Home = () => {
  const [data] = useQuery({ query: GET_COURSES });
  return (
    <>
      <h1>Course</h1>
      <ul>
        {data?.data &&
          data?.data?.courses?.map((course) => (
            <li key={course.id}>
              <Link href={`/app/courses/${course.id}`}>
                <a>{course.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};
export default Home;
