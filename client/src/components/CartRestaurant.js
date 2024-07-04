import React from 'react'

const CartRestaurant = ({ info }) => {
    const [showItems, setShowItems] = useState(false)
    const handleDropDown = () => {
        if (showItems) {
            setShowItems(false)
        } else {
            setShowItems(true)
        }
    }
    return (
        <div className='m-4' >
            <button className='p-4 w-full drop-shadow-lg bg-gray-200 flex justify-between' onClick={handleDropDown}>
                <span className='font-bold'>
                    {/* {data.title} */}
                </span>
                <span >
                    {showItems ? '▲' : '▼'}
                </span>
            </button>
            {/* {showItems && <div>
                {data.itemCards.map(card => < key={card.card.info.id} info={card.card.info} />)}
            </div>} */}
        </div>
    )
}

export default CartRestaurant