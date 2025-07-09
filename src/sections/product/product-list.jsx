import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';
import { useSearchParams } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function ProductList({ products, loading, ...other }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {products?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );

  const pageChanged = (num)=>{
    const pageNum = num.target.innerText
    setSearchParams({ page: pageNum });
  }


  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {/* {loading ? renderSkeleton : renderList} */}
        {renderList}

      </Box>

      {/* {products?.length > 5 && ( */}
        <Pagination
          count={6}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
          onClick={(num)=>{pageChanged(num)}}
          page={Number(searchParams.get('page')) || 1}
        />
      {/* )} */}
    </>
  );
}

ProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};
