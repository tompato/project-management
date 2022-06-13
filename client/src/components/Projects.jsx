import ProjectCard from './ProjectCard';
import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if(loading) { return <Spinner /> }
  if(error) { return <p>Something went wrong...</p> }

  return (
      <div className='mt-3'>
        { data.projects.length > 0 ? (
          <div className="row">
            { data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (<p>No results</p>) }
      </div>
  )
}
