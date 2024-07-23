import { useEffect, useState } from "react"
import ExploreCards from "./ExploreCards"


const ExploreSection = ({ data }) => {
    const [count, setCount] = useState(data.brands.length)
    const [displayData, setDisplayData] = useState([])

    const handleShowMore = () => {
        setDisplayData(data.brands)
        setCount(0)
    }
    useEffect(() => {
        if (count > 5) {
            setCount(5)
            setDisplayData(data.brands.slice(0, 5))
        }
        else {
            setDisplayData(data.brands)
        }
    }, [])

    return (
        <div className="mt-[5%] w-[100%] ">
            <label className="text-2xl font-bold text-black">{data.title}</label>
            <div className="flex mt-[2%] items-center  text-center flex-wrap">
                {displayData.map((brand,index) => <ExploreCards key={index} data={brand} />)}
                {count >= 5 && <div className=" w-[30%] mx-[1.6%] my-[2%]" onClick={() => handleShowMore()}><label className="border flex justify-center items-center h-[50px] text-md shadow font-semibold text-gray-600">Show More ˅</label></div>}
            </div>
        </div>
    )
}

export default ExploreSection