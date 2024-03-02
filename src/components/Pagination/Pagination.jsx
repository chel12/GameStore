import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = () => {
	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel="..."
			nextLabel=" > "
			onPageChange={() => null}
			pageRangeDisplayed={8}
			pageCount={3}
			previousLabel=" < "
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
