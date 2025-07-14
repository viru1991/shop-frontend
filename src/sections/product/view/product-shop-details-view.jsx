import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { useGetProduct } from 'src/api/product';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CartIcon from '../common/cart-icon';
import { useCheckoutContext } from '../../checkout/context';
import ProductDetailsReview from '../product-details-review';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';

import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction, reset,loadStart,resetStoreKey  } from 'src/store/slice';
import { acgSelector } from 'src/store/selector';
import { createStructuredSelector } from 'reselect';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

export default function ProductShopDetailsView({ id }) {
  const settings = useSettingsContext();
  const dispatch = useDispatch();
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
  });
  const { acgSlice: state } = useSelector(acgStateSelector);
  console.log(id, "id")
  const checkout = useCheckoutContext();

  const [currentTab, setCurrentTab] = useState('description');

  // const { product, productLoading, productError } = useGetProduct(id);
  // const product = {};
  // const productLoading = true
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  // const [product,setProduct] = useState({})
  const product = state?.productDetail?.data[0]

  useEffect(() => {
  // if (state?.err) {
    console.log(state?.err,"error")
    // dispatch(resetStoreKey ({ storeKey: STORE_KEYS.PRODUCT_DETAIL }));
  // }
}, [state?.err]);

  useEffect(() => {
    dispatch(loadStart())
    const bundle = {
        payload: {
            urlPath: ACTION_CODES.GET_PRODUCT_DETAIL+`/${id}`,
            requestType: 'GET',
        },
        // uniqueScreenIdentifier: { isLoggedIn: true },
          uniqueScreenIdentifier: { productDetail: id },
        storeKey: STORE_KEYS.PRODUCT_DETAIL
    };
    dispatch(executeACGAction(bundle));
  },[dispatch])


//  useEffect(() => {
//     if(state?.productDetail?.data){
//       setProduct(state.productDetail?.data)
//     }
//   }, [state?.productDetail]);
  

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${state?.err}`}
      action={
        <Button
          component={RouterLink}
          href={paths.product.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          {
            name: 'Shop',
            href: paths.product.root,
          },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            items={checkout?.items}
            onAddCart={checkout?.onAddToCart}
            onGotoStep={checkout?.onGotoStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
            {
              value: 'reviews',
              label: `Reviews (${product?.reviews?.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}

        {currentTab === 'reviews' && (
          <ProductDetailsReview
            ratings={product?.ratings}
            reviews={product?.reviews}
            totalRatings={product?.totalRatings}
            totalReviews={product?.totalReviews}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      {state?.isLoading && renderSkeleton}
      {state?.err  && renderError}
      {product && !state?.err && renderProduct}
    </Container>
  );
}

ProductShopDetailsView.propTypes = {
  id: PropTypes.string,
};
