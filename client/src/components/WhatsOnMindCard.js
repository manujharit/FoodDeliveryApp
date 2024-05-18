import Config from "../configs/configs"

const { CDN_URL } = Config

const WhatsOnMindCard = ({ data }) => {
  return (
    <div className="hover:shadow-lg m-2 snap-start rounded-lg min-w-[150px] mx-4">
      <a href={data.action.link} target="_blank"><img src={CDN_URL + data.imageId} className="" /></a>
    </div>
  )
}

export default WhatsOnMindCard