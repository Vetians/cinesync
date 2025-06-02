import ScrollToTop from "./ScrollToTop"

const PaginationComponent = ({currentPage, totalPages, onPageChange}) => {

    const maxVisible = 7
    const pages = []

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = startPage + maxVisible - 1

    if(endPage > totalPages){
        endPage = totalPages
        startPage = Math.max(1, endPage - maxVisible + 1)
    }

    if(currentPage > 1){
        pages.push(
            <button key="prev" onClick={() => onPageChange(currentPage - 1)} className="page-btn">
                Prev
            </button>
        )
    }

    if(startPage > 1){
        pages.push(
            <button key={1} onClick={() => onPageChange(1)} className="page-btn">
                1
            </button>
        )
        if(startPage > 2){
            pages.push(
                <span key="start-ellipsis" className="page-ellipsis">...</span>
            )
        }
    }

    for(let i = startPage; i <= endPage; i++){
        pages.push(
            <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`page-btn ${i === currentPage ? "active" : ""}`}
            >
                {i}
            </button>
        )
    }

    if(endPage < totalPages){
        if(endPage < totalPages - 1){
            pages.push(
                <span key="end-ellipsis" className="page-ellipsis">...</span>
            )
        }
        pages.push(
            <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="page-btn"
            >
                {totalPages}
            </button>
        )
    }

    if(currentPage < totalPages){
        pages.push(
            <button
            key="next" 
            onClick={() => onPageChange(currentPage + 1)}
            className="page-btn"
            >
                Next
            </button>
        )
    }

    return (
        <div>
            <div className="pagination">
                {pages}
            </div>
        </div>
    )
}

export default PaginationComponent