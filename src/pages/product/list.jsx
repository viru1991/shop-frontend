import { Helmet } from 'react-helmet-async';

import  ProductShopView  from 'src/sections/product/Shop';

// ----------------------------------------------------------------------

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title> Product: Shop</title>
      </Helmet>

      <ProductShopView />
    </>
  );
}
