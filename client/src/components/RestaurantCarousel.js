import { useState } from "react"
import ItemList from './ItemList'


const RestaurantCarousel = ({ data }) => {
    const index = data.itemCards.length
    const [showItems, setShowIndex] = useState(index)
    
    const handleDropDown = () => {
        if (showItems) {
            setShowIndex(null)
        } else {
            setShowIndex(index)
        }
    }

    return (
        <div className='m-4' >
            <button className='p-4 w-full drop-shadow-lg bg-gray-200 flex justify-between' onClick={handleDropDown}>
                <span className='font-bold'>
                    {data.title} ({index})
                </span>
                <span className="hover:border" >
                    {showItems ? '⬆️' : '⬇️'}
                </span>
            </button>
            {showItems && <div>
                {data.itemCards.map(card => <ItemList key={card.card.info.id} info={card.card.info} />)}
            </div>}
        </div>
    )
}

export default RestaurantCarousel