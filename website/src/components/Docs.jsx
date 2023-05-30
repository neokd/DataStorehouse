import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Docs() {
  return (
    <div>
      <Navbar />
      
      <div className='dark:bg-customGray bg-gray-200 h-screen'>
        <div className="container mx-96 mt-28 fixed ">
          <Sidebar />
          <div className='dark:text-white'>
            Hello World
          </div>

        </div>
      </div>
    </div>
  )
}

export default Docs
