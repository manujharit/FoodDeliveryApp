import ExploreSection from "./ExploreSection"

const Explore = ({ data }) => {
    return (
        <div className="my-[7%] flex flex-col">
            {data.map((data,index) => <ExploreSection key={index} data={data} />)}
        </div>
    )
}

export default Explore