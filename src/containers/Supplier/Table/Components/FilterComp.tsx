import { useSupplierContext } from "../../Supplier"

const FilterComp = () => {
  const { setQueryParams } = useSupplierContext()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams((prev) => {
      return { ...prev, keywords: event.target.value }
    })
  }

  return (
    <div className="row mb-2">
      <div className="search-bar col-12 col-md-4">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default FilterComp