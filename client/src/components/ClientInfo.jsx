import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <>
      <h5 className='mt-5'>Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className='me-1' /> { client.name }  
        </li> 
        <li className="list-group-item">
          <FaEnvelope className='me-1' /> { client.email }  
        </li> 
        <li className="list-group-item">
          <FaPhone className='me-1' /> { client.phone }  
        </li>  
      </ul>
    </>
  )
}
