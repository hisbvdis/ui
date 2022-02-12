import LoadMoreBtn from "./LoadMoreBtn.js";
import PageButtons from "./PageButtons.js";

const Pagination = (props) => {
  return (<>
    <LoadMoreBtn {...props}/>
    <PageButtons {...props}/>
  </>)
}

export default Pagination;