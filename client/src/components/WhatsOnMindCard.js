import Config from "../configs/configs"

const { CDN_URL } = Config

const WhatsOnMindCard = ({ data }) => {
  // console.log(data)
  return (
    <div className="hover:shadow-lg m-2 snap-start rounded-lg min-w-[120px] mx-4">
      <img src={CDN_URL + data.imageId} className="" />
    </div>
  )
}

export default WhatsOnMindCard