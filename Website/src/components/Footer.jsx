import { Link } from "react-router-dom"


function Footer() {
  return (
    <div className="bottom-0 text-center">
      <div className='dark:bg-customGray/5 dark:text-white/50 
               py-8 flex flex-rows justify-center items-center'>
        &copy;<Link to='https://github.com/neokd/DataBucket'>DataBucket</Link>  2023 | Developed by Coders for Coders 👩‍💻🧑‍💻

      </div>
    </div>
  )
}

export default Footer
