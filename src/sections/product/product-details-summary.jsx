import PropTypes from 'prop-types';
import { useEffect, useCallback,useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();

  const {
    id,
    name,
    // sizes,
    price,
    coverUrl,
    // colorOptions:colors,
    newLabel,
    // available,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
    stock,
    _id
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);
  // const available = stock ? stock[0]?.quantity : 0
  // const available = sizes?.length > 0 ? sizes[0]?.quantity : 0
  const defaultSize = stock?.[0]?.size || 0;
  const defaultAvailable = stock?.find((s) => s.size === defaultSize)?.quantity || 0;
  // const existingItem = items?.find(
  //   (item) => item.id === _id && item.size === defaultSize
  // );
  
const allColors = [...new Set(stock?.flatMap(s => s.color) || [])];



  const defaultValues = {
    id:_id,
    name,
    coverUrl,
    // available,
    price,
    // colors:colors ? colors[0] : [],
      colors: allColors[0] || [],
    // size: stock ? stock[0]?.size : [],
    // quantity: available < 1 ? 0 : 1,
    size: defaultSize,
    available: defaultAvailable,
    quantity: defaultAvailable < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();
  const available = stock?.find((s) => s.size === values.size)?.quantity || 0;
const selectedStock = stock?.find(s => s.size === values.size);
const availableColors = selectedStock ? selectedStock.color : [];
  useEffect(() => {
    if (available > 0 && values.quantity === 0) {
      setValue('quantity', 1);
    }
    if(available == 0){
      setValue('quantity', 0);
    }
  }, [available, values.quantity, setValue]);

  useEffect(() => {
  if (!availableColors.includes(values.colors)) {
    setValue('colors', availableColors[0] || '');
  }
}, [values.size, availableColors, values.colors, setValue]);

useEffect(() => {
  // When size changes, always reset quantity to 1 (or 0 if out of stock)
  if (available > 0) {
    setValue('quantity', 1);
  } else {
    setValue('quantity', 0);
  }
}, [values.size, available, setValue]);

  const existingItem = items?.find(
    (item) =>
      item.id === _id &&
      item.size === values.size &&
      item.colors.includes(values.colors)
  );
  

  const inCartQty = existingItem?.quantity || 0;

  const isMaxQuantity =
  !!items?.length &&
  items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;
  const isOutOfStock = available <= 0 || values.quantity <= 0;

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        colors: [values.colors],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  // const updateSize = (ele) => {
  //   setSizes([ele])
  // }
  // onClick={()=>updateSize(ele)}
  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {priceSale && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );
  console.log(allColors,"allc")
  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

       <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            // colors={colors || []}
             colors={allColors || []}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color)}
            availableColors={availableColors}
            limit={4}
          />
        )}
      /> 
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {/* {sizes?.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))} */}
        
             {stock?.map((ele) => (
            <MenuItem key={ele.size} value={ele.size} >
             {ele.size}
            </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>
    {console.log(values,"vals")}
    {console.log(inCartQty,"in ccart qty")}
      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />
  
        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
         
        </Typography>
        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
        in-cart: {inCartQty}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions || isOutOfStock}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const renderLabels = (newLabel?.enabled || saleLabel?.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel?.enabled && <Label color="info">{newLabel?.content}</Label>}
      {saleLabel?.enabled && <Label color="error">{saleLabel?.content}</Label>}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Typography variant="h5">{name}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions}

        {renderSizeOptions}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {renderShare}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  items: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
