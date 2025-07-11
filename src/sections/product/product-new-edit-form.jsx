import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction, loadStart, resetStoreKey } from 'src/store/slice';
import { acgSelector } from 'src/store/selector';
import { createStructuredSelector } from 'reselect';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector()
  });
  const { acgSlice: state } = useSelector(acgStateSelector);

  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  // const NewProductSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   images: Yup.array().min(1, 'Images is required'),
  //   tags: Yup.array().min(2, 'Must have at least 2 tags'),
  //   category: Yup.string().required('Category is required'),
  //   price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  //   description: Yup.string().required('Description is required'),
  //   // not required
  //   taxes: Yup.number(),
  //   newLabel: Yup.object().shape({
  //     enabled: Yup.boolean(),
  //     content: Yup.string(),
  //   }),
  //   saleLabel: Yup.object().shape({
  //     enabled: Yup.boolean(),
  //     content: Yup.string(),
  //   }),
  // });

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1, 'Images is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    description: Yup.string().required('Description is required'),
    taxes: Yup.number(),
    newLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
    saleLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
    // ✅ Add stock here
    stock: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number().min(0, 'Quantity must be >= 0').required('Required'),
        size: Yup.string().required('Size is required'),
        colors: Yup.array().min(1, 'Select at least one color'),
      })
    ),
  });



  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentProduct?.name || '',
  //     description: currentProduct?.description || '',
  //     subDescription: currentProduct?.subDescription || '',
  //     images: currentProduct?.images || [],
  //     //
  //     code: currentProduct?.code || '',
  //     sku: currentProduct?.sku || '',
  //     price: currentProduct?.price || 0,
  //     quantity: currentProduct?.quantity || 0,
  //     priceSale: currentProduct?.priceSale || 0,
  //     tags: currentProduct?.tags || [],
  //     taxes: currentProduct?.taxes || 0,
  //     gender: currentProduct?.gender || '',
  //     category: currentProduct?.category || '',
  //     colors: currentProduct?.colors || [],
  //     sizes: currentProduct?.sizes || [],
  //     newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
  //     saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
  //   }),
  //   [currentProduct]
  // );

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || '',
      category: currentProduct?.category || '',
      // colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
      // ✅ Add this:
      stock: currentProduct?.stock || [],
    }),
    [currentProduct]
  );


  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stock',
  });

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data, "dstst")

    const formData = new FormData();

    // Add all text fields
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('subDescription', data.subDescription);
    formData.append('code', data.code);
    formData.append('sku', data.sku || '');
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('priceSale', data.priceSale);
    formData.append('taxes', data.taxes);
    formData.append('category', data.category);
    formData.append('brand', data.brand || '');
    formData.append('discount', data.discount || 0);

    // Convert arrays to JSON strings
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('gender', JSON.stringify(data.gender));
    formData.append('sizes', JSON.stringify(data.sizes));
    formData.append('stock', JSON.stringify(data.stock));
    formData.append('newLabel', JSON.stringify(data.newLabel));
    formData.append('saleLabel', JSON.stringify(data.saleLabel));
    formData.append('images', data.images)

    // Add images — must be real File objects
    data.images.forEach((file, idx) => {
      console.log(file, "file")
      formData.append('images', file);  // file must be File, not { path }
    });
    //   reset();
    //   enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
    //   router.push(paths.dashboard.product.root);
    dispatch(loadStart())
    const bundle = {

      payload: {
        urlPath: ACTION_CODES.ADD_PRODUCTS,
        requestType: 'POST',
        reqObj: formData,
        contentType: 'multipart/form-data',
      },
      // uniqueScreenIdentifier: { productDetail: id },
      storeKey: STORE_KEYS.ADDED_PRODUCTS
    };
    dispatch(executeACGAction(bundle));
  });

  useEffect(() => {
    const created = state[STORE_KEYS.ADDED_PRODUCTS];
    console.log(created, "ASda")
    if (created?.data?.acknowledged) {
      enqueueSnackbar('Create success!', { variant: 'success' });

      reset(); // ✅ clear form
      router.push(paths.dashboard.product.root); // ✅ redirect

      // ✅ clear storeKey so it doesn't re-trigger
      dispatch(resetStoreKey({ storeKey: STORE_KEYS.ADDED_PRODUCTS }));
    }

    if (created?.error) {
      enqueueSnackbar('Create failed!', { variant: 'error' });
      dispatch(resetStoreKey({ storeKey: STORE_KEYS.ADDED_PRODUCTS }));
    }
  }, [state[STORE_KEYS.ADDED_PRODUCTS], enqueueSnackbar, dispatch, reset, router]);



  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Product Name" />

            <RHFTextField name="subDescription" label="Sub Description" multiline rows={4} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={3}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="code" label="Product Code" />

              {/* <RHFTextField name="sku" label="Product SKU" /> */}



              {/* <RHFMultiSelect
                checkbox
                name="colors"
                label="Colors"
                options={PRODUCT_COLOR_NAME_OPTIONS}
              /> */}

              <RHFSelect native name="category" label="Category" InputLabelProps={{ shrink: true }}>
                {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
                  <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </RHFSelect>



              {/* <RHFMultiSelect checkbox name="sizes" label="Sizes" options={PRODUCT_SIZE_OPTIONS} /> */}
              {/* <RHFTextField
                name="quantity"
                label="Quantity"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
              <RHFSelect native name="size" label="size" InputLabelProps={{ shrink: true }}>
                {PRODUCT_SIZE_OPTIONS.map((classify) => (
                  <option key={classify.label} value={classify.value}>
                    {classify.label}
                  </option>
                ))}
              </RHFSelect> */}
            </Box>
            <Stack spacing={2}>
              {fields.map((item, index) => (
                <Stack
                  key={item.id}
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  alignItems="center"
                >
                  <Box sx={{ flex: 1 }}>
                    <RHFTextField
                      name={`stock.${index}.quantity`}
                      label="Quantity"
                      type="number"
                      placeholder="0"
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <RHFSelect
                      native
                      name={`stock.${index}.size`}
                      label="Size"
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value={`stock.${index}.size`} disabled>Select size</option>
                      {PRODUCT_SIZE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <RHFMultiSelect
                      name={`stock.${index}.color`}
                      label="Colors"
                      checkbox
                      options={PRODUCT_COLOR_NAME_OPTIONS}
                      showColor={true}
                    />
                  </Stack>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}

              <Button
                variant="contained"
                onClick={() => append({ quantity: 0, size: '', color: [] })}
              >
                Add Stock Row
              </Button>
            </Stack>
            <RHFAutocomplete
              name="tags"
              label="Tags"
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <RHFMultiCheckbox row name="gender" spacing={2} options={PRODUCT_GENDER_OPTIONS} />
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="saleLabel.content"
                label="Sale Label"
                fullWidth
                disabled={!values.saleLabel.enabled}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="newLabel.content"
                label="New Label"
                fullWidth
                disabled={!values.newLabel.enabled}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderPricing = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pricing
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Price related inputs
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pricing" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField
              name="price"
              label="Regular Price"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      $
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="priceSale"
              label="Sale Price"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      $
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Switch checked={includeTaxes} onChange={handleChangeIncludeTaxes} />}
              label="Price includes taxes"
            />

            {!includeTaxes && (
              <RHFTextField
                name="taxes"
                label="Tax (%)"
                placeholder="0.00"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        %
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentProduct ? 'Create Product' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderPricing}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
