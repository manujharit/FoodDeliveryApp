import Config from "../configs/configs"
import { parseParamsAndReturnPath } from '../utils/utils'
import { Link } from "react-router-dom"

const { CDN_URL } = Config

const WhatsOnMindCard = ({ data }) => {
  const path = parseParamsAndReturnPath(data.action.link,data?.accessibility?.altText)

  return (
    <div className="hover:shadow-lg m-2 snap-start rounded-lg min-w-[150px] mx-4">
      <Link to={path}><img src={CDN_URL + data.imageId} className="" /></Link>
    </div>
  )
}

export default WhatsOnMindCard