import { useNavigate } from 'react-router-dom';

const Error = () => {
  
    const navigateTo = useNavigate();
    const handleRedirect = () => {
        navigateTo('/');
    }
  
  return (
    <div>
      <h1>Error</h1>
      <p>An error has occurred. Please try again later.</p>
      <button onClick={handleRedirect}>Go to Home</button>
    </div>
  );
};

export default Error;
