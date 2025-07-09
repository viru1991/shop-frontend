import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';
import { useDispatch,useSelector } from 'react-redux';
import { acgSelector } from 'src/store/selector';
import { createStructuredSelector } from 'reselect';
import { executeACGAction,loadStart } from 'src/store/slice';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';
// ----------------------------------------------------------------------

export default function ProductEditView({ id }) {
  const settings = useSettingsContext();
     const dispatch = useDispatch();
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
  });
  const { acgSlice: state } = useSelector(acgStateSelector);

      useEffect(() => {
        dispatch(loadStart())
        const bundle = {
            payload: {
                urlPath: ACTION_CODES.GET_PRODUCT_DETAIL+`/${id}`,
                requestType: 'GET',
            },
            uniqueScreenIdentifier: { productDetail: id },
            storeKey: STORE_KEYS.PRODUCT_DETAIL
        };
        dispatch(executeACGAction(bundle));
      },[])
  
  // const { product: currentProduct } = useGetProduct(id);
  const product = state?.productDetails?.data[0]
  const currentProduct = state?.productDetail?.data[0]

  console.log(currentProduct,"ASd")
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Product',
            href: paths.dashboard.product.root,
          },
          { name: state?.productDetail?.data[0]?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={state?.productDetail?.data[0]} />
    </Container>
  );
}

ProductEditView.propTypes = {
  id: PropTypes.string,
};
