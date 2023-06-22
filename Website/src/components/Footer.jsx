import { Link } from "react-router-dom"


function Footer() {
  return (
    <div className="bottom-0 text-center ">
      <div className='dark:bg-customGray/5 dark:text-white/50 border-t border-white/40 
               py-8 flex flex-col justify-center items-center'>
        <div className="mb-4 text-white">
          <button className="mx-2">
            <Link to='https://github.com/neokd/DataBucket/' className='bg-amber-500 ' target='_blank'>
              <div className='p-3 border-amber-500 rounded-full bg-amber-500 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-6 h-6 '
                >
                  <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                  <path d='M9 18c-4.51 2-5-2-7-2'></path>
                </svg>
              </div>
            </Link>
          </button>
          <button className="mx-2">
            <Link to='mailto:databucketcontribution@gmail.com' className='bg-amber-500 ' target='_blank'>
              <div className='p-3 border-amber-500 rounded-full bg-amber-500 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </Link>
          </button>
        </div>
        <div>
          &copy;<Link to='https://github.com/neokd/DataBucket'>DataBucket</Link>  2023 | Developed by Coders for Coders 👩‍💻🧑‍💻</div>
      </div>
    </div>
  )
}

export default Footer
