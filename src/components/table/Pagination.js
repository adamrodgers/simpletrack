import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const buttonClasses = "w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-blue";

  const PaginationButton = ({ onClick, children, isActive }) => (
    <button onClick={onClick} className={`${buttonClasses} ${isActive ? "text-gray-900 font-bold" : ""}`}>
      {children}
    </button>
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="inline-flex border border-[#e4e4e4] bg-white p-4 rounded-xl mt-4">
        <ul className="flex items-center justify-center w-full">
          <li className="px-[6px]">
            <PaginationButton onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
              <ChevronLeftIcon className="h-5 w-5" />
            </PaginationButton>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li className="px-[6px]" key={index}>
              <PaginationButton onClick={() => onPageChange(index + 1)} isActive={currentPage === index + 1}>
                {index + 1}
              </PaginationButton>
            </li>
          ))}
          <li className="px-[6px]">
            <PaginationButton onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
              <ChevronRightIcon className="h-5 w-5" />
            </PaginationButton>
          </li>
        </ul>
      </div>
      <div className="mt-2 px-4 py-1 bg-white rounded-md text-gray-500 text-sm font-medium">
        {startItem} - {endItem} of {totalItems}
      </div>
    </div>
  );
};

export default Pagination;
