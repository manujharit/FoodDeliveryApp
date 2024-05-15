import BrandLogo from '../../assets/BrandLogo.png'
const Navbar = () => {
    return (
        <div className=" fixed flex flex-row justify-between items-center px-[10%]  z-50 bg-white top-0 w-[100%] h-[10%] shadow-md shadow-gray-200">
            <div className='w-[20%] flex flex-row items-center'>
                <img src={BrandLogo} className='w-[30%]' />
                <label className='w-[60%] ml-[35%] hover:underline'>Location</label>
            </div>
            <div className='flex flex-row w-[40%] h-[50%]'>
                <input type="text" className='border rounded-s-xl border-solid border-gray-400 w-[90%] bg-gray-200 px-[5%]' placeholder={"Search for Restaurants"} />
                <button className='border border-solid border-gray-400 flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 rounded-e-xl w-[10%]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#fff" d="M18.79 17.38l-3.39-3.39a6.5 6.5 0 1 0-1.41 1.41l3.39 3.39a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41zM5.5 11a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z" />
                    </svg>

                </button>
            </div>
            <div className='flex flex-row justify-between w-[20%] text-center'>
                <label className='text-md font-semibold text-gray-600 hover:text-orange-400'>Offers</label>
                <label className='text-md font-semibold text-gray-600 hover:text-orange-400'>Help</label>
                <label className='text-md font-semibold text-gray-600 hover:text-orange-400'>Sign In</label>
                <label className='text-md font-semibold text-gray-600 hover:text-orange-400'>Cart</label>

            </div>
        </div>
    )
}

export default Navbar