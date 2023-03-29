import debounce from "lodash.debounce";
import { ApiTableControl } from "src/components/ApiTable";

interface FilterCompProps {
  control: ApiTableControl<any>
}

export const KeywordsFilter = (props: FilterCompProps) => {
  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    props.control.filter('keywords', event.target.value);
  }, 500)

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