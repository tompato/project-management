import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { FaTrash } from 'react-icons/fa';

export default function DeleteProjectButton({ projectId }) {

  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => { navigate('/') },
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  return (
    <button className="btn btn-danger btn-sm" onClick={deleteProject}>
      <FaTrash /> Delete
    </button>
  )
}
