const mergeData = (oldData, newData) => {
        const set = new Set(oldData.map(data => data.id))

        const uniqueData = newData.filter((data) => {
                if (!set.has(data.id))
                        return data
        })

        return [...oldData, ...uniqueData]
}

const getResItemQuantity = (resItems, info) => {
        if (resItems) {
                const quantity = resItems[info.id]?.quantity
                if (quantity) {
                        return quantity
                }
        }
        return 0
}
export { mergeData , getResItemQuantity }