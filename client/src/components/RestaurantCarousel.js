import { useState } from "react"
import ItemList from './ItemList'


const RestaurantCarousel = ({ data }) => {
    const index = data.itemCards.length
    const [showItems, setShowItems] = useState(index)
    
    const handleDropDown = () => {
        if (showItems) {
            setShowItems(null)
        } else {
            setShowItems(index)
        }
    }

    return (
        <div className='m-4' >
            <button className='p-4 w-full drop-shadow-lg bg-gray-200 flex justify-between' onClick={handleDropDown}>
                <span className='font-bold'>
                    {data.title}
                </span>
                <span >
                    {showItems ? '▲' : '▼'}
                </span>
            </button>
            {showItems && <div>
                {data.itemCards.map(card => <ItemList key={card.card.info.id} info={card.card.info} />)}
            </div>}
        </div>
    )
}

export default RestaurantCarousel