const mergeData = (oldData, newData) => {
    const set = new Set(oldData.map(data => data.id))

    const uniqueData = newData.filter((data) => {
        if(!set.has(data.id))
         return data
        })

    return [...oldData, ...uniqueData]
}

export { mergeData }