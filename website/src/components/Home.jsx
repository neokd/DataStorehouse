import Navbar from './Navbar'
function Home() {
    return (
        <div>
            <Navbar />
            <div className="h-screen bg-customGray flex flex-col justify-center items-center ">
                <h1 className="text-white text-7xl nunito font-bold">Data<span className="text-purple-400 ">Bucket</span></h1>
                <span className="text-white text-xl py-4 nunito font-semibold w-96">A open-source project that aims to create a collaborative platform for gathering and sharing a wide variety of datasets.</span>
            </div>

        </div>
    )
}

export default Home
