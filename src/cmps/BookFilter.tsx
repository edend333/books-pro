import { useState, useEffect } from 'react'

type BookFilterProps = {
  filterBy: { title: string; maxPrice: number }
  onSetFilter: (filter: { title: string; maxPrice: number }) => void
}

export function BookFilter({ filterBy, onSetFilter }: BookFilterProps) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    let { name: field, type } = target
    let value: string | number = target.value

    if (type === 'number') value = +target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { title, maxPrice } = filterByToEdit

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={maxPrice}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}