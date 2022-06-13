import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries'; 

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if(loading) return <Spinner />
  if(error) return <p>Something went wrong...</p>

  return (
    <>
      { !loading && !error  && (
        <div className="mx-auto w-75 card p-5">
          <div className="d-flex justify-content-between align-items-start">
            <h1>{ data.project.name }</h1>
            <div>
              <Link to="/" className='btn btn-light btn-sm w-25 d-inline me-2'>
                <FaArrowLeft /> Back
              </Link>
              <DeleteProjectButton projectId={id} />
            </div>
          </div>
          <p>{ data.project.description }</p>
          <h5 className='mt-3'>Status</h5>
          <p className="lead mb-0">{ data.project.status }</p>
          <ClientInfo client={ data.project.client } />
          <EditProjectForm project={ data.project } />
        </div>
      )}
    </>
  )
}
