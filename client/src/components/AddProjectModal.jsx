import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddProjectModal() {

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ status, setStatus ] = useState('new');
  const [ clientId, setClientId ] = useState('');

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: addProject }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      });
    }
  })

  const onSubmit = e => {
    e.preventDefault();

    if(name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  }

  if(loading) return null;
  if(error) return alert('Something went wrong...');

  return (
    <>
      { !loading && !error && (
        <>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <span className="d-flex align-items-center"><FaList className="me-2" />New Project</span>
          </button>
          <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />  
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea className="form-control" id="description" value={description} rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="status">Status</label>
                      <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>  
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="clientId" className="form-label">Client</label>
                      <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select client</option>
                        { data.clients.map(client => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        )) }
                      </select> 
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) }
    </>
  )
}
