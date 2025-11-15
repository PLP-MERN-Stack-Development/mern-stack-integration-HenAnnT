const Pagination = ({ page, total, limit, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    return (
        <div>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i+1}
                    disabled={i+1 === page}
                    onClick={() => onPageChange(i+1)}
                >
                    {i+1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
