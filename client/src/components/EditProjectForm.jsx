import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {

  const [ name, setName ] = useState(project.name);
  const [ description, setDescription ] = useState(project.description);
  const [ status, setStatus ] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = e => {
    e.preventDefault();

    if(!name || !description || !status) {
      return alert('Please fill out all required fields...');
    }

    updateProject(name, description, status);
  }

  return (
    <div className="mt-5">
      <h3>Update project details</h3>
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
            <option value="">Please select</option>
            <option value="new">Not started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>  
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary btn-warning">Update</button>
        </div>
      </form>
    </div>
  )
}
