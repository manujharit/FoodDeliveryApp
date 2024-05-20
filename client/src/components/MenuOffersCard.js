import Config from "../configs/configs"
const {CDN_URL} = Config
const MenuOffersCard = ({data}) => {
    const {header, couponCode, offerLogo } = data
  return (
    <div className='min-w-[350px] max-w-[350px] min-h-[80px] max-h-[80px] mx-[10px] my-[20px] p-[10px] border rounded-2xl  transition-all duration-300 hover:shadow-lg hover:scale-95'>
        <div className=" flex flex-row">
        <img src={CDN_URL + offerLogo} className="w-14 mr-[10px]" />
        <div className='flex flex-col'>
        <label className='text-lg font-bold'>{header}</label>
        <label className='text-md text-gray-600 font-semibold'>{couponCode}</label>
        </div>
        </div>
    </div>
  )
}

export default MenuOffersCard