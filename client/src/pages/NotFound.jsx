import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className='text-danger' size="5em" />
      <h1>404 - Not Found</h1>
      <p className="lead">Sorry we could not find the pagr you are looking for.</p>
      <Link to='/' className='btn btn-primary'>Go back home</Link>
    </div>
  )
}
