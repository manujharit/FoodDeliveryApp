import ExploreSection from "./ExploreSection"

const Explore = ({ data }) => {
    return (
        <div className="my-[7%] flex flex-col">
            {data.map(data => <ExploreSection key={data.text} data={data} />)}
        </div>
    )
}

export default Explore