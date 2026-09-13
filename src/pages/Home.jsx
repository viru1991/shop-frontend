
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import MotionViewport from 'src/components/animate/motion-viewport';
import { useSettingsContext } from 'src/components/settings';

import ProductItem from 'src/sections/product/product-item';
// import ProductItemSkeleton from 'src/sections/product/product-skeleton';
import { ProductItemSkeleton } from 'src/sections/product/product-skeleton';

import { executeACGAction, loadStart } from 'src/store/slice';
import { acgSelector } from 'src/store/selector';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';
import Footer from '../layouts/main/footer';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    icon: 'solar:plain-2-bold-duotone',
    title: 'Fast delivery',
    description: 'Quick and reliable delivery straight to your door.',
  },
  {
    icon: 'solar:shield-check-bold-duotone',
    title: 'Secure checkout',
    description: 'Your payment and personal information stay protected.',
  },
  {
    icon: 'solar:refresh-circle-bold-duotone',
    title: 'Easy returns',
    description: 'Shop confidently with a simple return experience.',
  },
  {
    icon: 'solar:headphones-round-sound-bold-duotone',
    title: 'Here to help',
    description: 'Our support team is ready whenever you need us.',
  },
];

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const dispatch = useDispatch();

  const acgStateSelector = createStructuredSelector({
    acgSlice: acgSelector(),
  });

  const { acgSlice: state } = useSelector(acgStateSelector);

  const productState = state?.[STORE_KEYS.PRODUCT_LIST];
  const products = productState?.data || [];
  const loading = state?.isLoading;

  useEffect(() => {
    if (!productState?.data) {
      dispatch(loadStart());

      dispatch(
        executeACGAction({
          payload: {
            urlPath: ACTION_CODES.GET_PRODUCTS,
            requestType: 'GET',
            reqObj: { page: 1 },
          },
          uniqueScreenIdentifier: { page: 1 },
          storeKey: STORE_KEYS.PRODUCT_LIST,
        })
      );
    }
  }, [dispatch, productState?.data]);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const heroProducts = useMemo(() => {
    return [
      products[0],
      products[1],
      products[2],
    ].filter(Boolean);
  }, [products]);

  const categories = useMemo(() => {
    const grouped = {};

    products.forEach((product) => {
      const category = product?.category;

      if (!category) return;

      if (!grouped[category]) {
        grouped[category] = product;
      }
    });

    return Object.entries(grouped).slice(0, 4);
  }, [products]);

  const renderHero = (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        pt: { xs: 12, md: 15 },
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          filter: 'blur(80px)',
          top: -220,
          right: -100,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.secondary.main, 0.06),
          filter: 'blur(70px)',
          bottom: -180,
          left: -100,
        }}
      />

      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Grid
          container
          alignItems="center"
          spacing={{ xs: 6, md: 8 }}
        >
          {/* Hero copy */}
          <Grid xs={12} md={6}>
            <MotionViewport>
              <Stack
                spacing={3}
                sx={{
                  maxWidth: 620,
                  textAlign: { xs: 'center', md: 'left' },
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Chip
                  icon={<Iconify icon="solar:star-bold" />}
                  label="New season · Fresh arrivals"
                  color="primary"
                  variant="soft"
                  sx={{
                    fontWeight: 700,
                    px: 1,
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3.5rem',
                      md: '4.25rem',
                    },
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  Find something
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      color: 'primary.main',
                    }}
                  >
                    you'll love.
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: 520,
                    color: 'text.secondary',
                    fontWeight: 400,
                  }}
                >
                  Discover carefully selected products designed to
                  make everyday life a little better.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ pt: 1 }}
                >
                  <Button
                    component={RouterLink}
                    href={paths.product.root}
                    size="large"
                    variant="contained"
                    endIcon={<Iconify icon="solar:arrow-right-bold" />}
                    sx={{
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Shop collection
                  </Button>

                  <Button
                    component={RouterLink}
                    href={paths.product.root}
                    size="large"
                    variant="outlined"
                    sx={{
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Explore products
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  spacing={3}
                  divider={<Divider orientation="vertical" flexItem />}
                  sx={{
                    pt: 2,
                    color: 'text.secondary',
                  }}
                >
                  <Box>
                    <Typography variant="h5" color="text.primary">
                      100%
                    </Typography>
                    <Typography variant="caption">
                      Quality checked
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h5" color="text.primary">
                      Easy
                    </Typography>
                    <Typography variant="caption">
                      Secure checkout
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h5" color="text.primary">
                      Fast
                    </Typography>
                    <Typography variant="caption">
                      Delivery
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </MotionViewport>
          </Grid>

          {/* Hero product collage */}
          <Grid xs={12} md={6}>
            <MotionViewport>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 420, sm: 540 },
                }}
              >
                {/* Main product */}
                {heroProducts[0] ? (
                  <Box
                    component={RouterLink}
                    href={paths.product.details(heroProducts[0]._id)}
                    sx={{
                      position: 'absolute',
                      width: { xs: '72%', sm: '65%' },
                      top: { xs: 25, sm: 20 },
                      left: { xs: '14%', sm: '16%' },
                      textDecoration: 'none',
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: theme.customShadows?.z24,
                        transform: 'rotate(-3deg)',
                        transition: theme.transitions.create('transform'),
                        '&:hover': {
                          transform: 'rotate(0deg) translateY(-8px)',
                        },
                      }}
                    >
                      <Image
                        src={heroProducts[0]?.images?.[0]}
                        alt={heroProducts[0]?.name}
                        ratio="4/3"
                        sx={{
                          width: 1,
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '65%',
                      height: 360,
                      top: 30,
                      left: '17%',
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                    }}
                  />
                )}

                {/* Second product */}
                {heroProducts[1] && (
                  <Box
                    component={RouterLink}
                    href={paths.product.details(heroProducts[1]._id)}
                    sx={{
                      position: 'absolute',
                      width: { xs: '42%', sm: '38%' },
                      right: { xs: '2%', sm: '3%' },
                      bottom: { xs: 35, sm: 55 },
                      zIndex: 3,
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 2.5,
                        boxShadow: theme.customShadows?.z16,
                        transform: 'rotate(5deg)',
                        transition: theme.transitions.create('transform'),
                        '&:hover': {
                          transform: 'rotate(1deg) translateY(-6px)',
                        },
                      }}
                    >
                      <Image
                        src={heroProducts[1]?.images?.[0]}
                        alt={heroProducts[1]?.name}
                        ratio="1/1"
                        sx={{ borderRadius: 1.5 }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Third product */}
                {heroProducts[2] && (
                  <Box
                    component={RouterLink}
                    href={paths.product.details(heroProducts[2]._id)}
                    sx={{
                      position: 'absolute',
                      width: { xs: '34%', sm: '31%' },
                      left: { xs: '1%', sm: '3%' },
                      bottom: { xs: 30, sm: 35 },
                      zIndex: 3,
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 2.5,
                        boxShadow: theme.customShadows?.z16,
                        transform: 'rotate(-7deg)',
                        transition: theme.transitions.create('transform'),
                        '&:hover': {
                          transform: 'rotate(-2deg) translateY(-6px)',
                        },
                      }}
                    >
                      <Image
                        src={heroProducts[2]?.images?.[0]}
                        alt={heroProducts[2]?.name}
                        ratio="1/1"
                        sx={{ borderRadius: 1.5 }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Floating badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 0, sm: 5 },
                    right: { xs: '3%', sm: '8%' },
                    zIndex: 4,
                    width: 92,
                    height: 92,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: theme.customShadows?.z12,
                    transform: 'rotate(10deg)',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.15,
                    }}
                  >
                    SHOP
                    <br />
                    NOW
                  </Typography>
                </Box>
              </Box>
            </MotionViewport>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const renderBenefits = (
    <Box sx={{ py: { xs: 5, md: 7 } }}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
          {BENEFITS.map((item) => (
            <Grid xs={12} sm={6} md={3} key={item.title}>
              <MotionViewport>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    height: 1,
                    p: 2,
                    borderRadius: 2,
                    transition: theme.transitions.create('background-color'),
                    '&:hover': {
                      bgcolor: 'background.neutral',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1.5,
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                    }}
                  >
                    <Iconify icon={item.icon} width={26} />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>
              </MotionViewport>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  const renderCategories = categories.length > 0 && (
    <Box sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MotionViewport>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                Browse the store
              </Typography>

              <Typography variant="h3">
                Shop by category
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: 'text.secondary',
                  maxWidth: 520,
                }}
              >
                Explore our collections and find products that fit
                your style.
              </Typography>
            </Box>

            <Button
              component={RouterLink}
              href={paths.product.root}
              endIcon={<Iconify icon="solar:arrow-right-linear" />}
            >
              View all
            </Button>
          </Stack>
        </MotionViewport>

        <Grid container spacing={2.5}>
          {categories.map(([category, product], index) => (
            <Grid
              key={category}
              xs={12}
              sm={6}
              md={3}
            >
              <MotionViewport>
                <Box
                  component={RouterLink}
                  href={paths.product.root}
                  sx={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    textDecoration: 'none',
                    bgcolor: 'background.neutral',
                    '&:hover .category-image': {
                      transform: 'scale(1.06)',
                    },
                    '&:hover .category-overlay': {
                      bgcolor: alpha(theme.palette.grey[900], 0.32),
                    },
                  }}
                >
                  <Image
                    className="category-image"
                    src={product?.images?.[0]}
                    alt={category}
                    ratio="4/5"
                    sx={{
                      width: 1,
                      transition: theme.transitions.create('transform'),
                    }}
                  />

                  <Box
                    className="category-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: alpha(theme.palette.grey[900], 0.48),
                      transition: theme.transitions.create('background-color'),
                    }}
                  />

                  <Stack
                    className="category-content"
                    spacing={0.5}
                    sx={{
                      position: 'absolute',
                      left: 24,
                      right: 24,
                      bottom: 24,
                      color: 'common.white',
                    }}
                  >
                    <Typography variant="h5">
                      {category === 'Shose' ? 'Shoes' : category}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="body2">
                        Explore collection
                      </Typography>

                      <Iconify icon="solar:arrow-right-linear" />
                    </Stack>
                  </Stack>
                </Box>
              </MotionViewport>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  const renderFeatured = (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        bgcolor: 'background.neutral',
      }}
    >
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MotionViewport>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                Curated for you
              </Typography>

              <Typography variant="h3">
                Featured products
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                A few of our latest picks, selected from the store.
              </Typography>
            </Box>

            <Button
              component={RouterLink}
              href={paths.product.root}
              endIcon={<Iconify icon="solar:arrow-right-linear" />}
            >
              See all products
            </Button>
          </Stack>
        </MotionViewport>

        <Grid container spacing={3}>
          {loading && !featuredProducts.length
            ? [1, 2, 3, 4].map((item) => (
                <Grid xs={12} sm={6} md={3} key={item}>
                  <ProductItemSkeleton />
                </Grid>
              ))
            : featuredProducts.map((product) => (
                <Grid xs={12} sm={6} md={3} key={product._id}>
                  <MotionViewport>
                    <ProductItem product={product} />
                  </MotionViewport>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );

  const renderStory = (
    <Box sx={{ py: { xs: 7, md: 12 } }}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
        >
          <Grid xs={12} md={6}>
            <MotionViewport>
              <Box
                sx={{
                  position: 'relative',
                  pr: { md: 5 },
                }}
              >
                {heroProducts[0] && (
                  <Image
                    src={
                      heroProducts[0]?.images?.[1] ||
                      heroProducts[0]?.images?.[0]
                    }
                    alt={heroProducts[0]?.name}
                    ratio="4/3"
                    sx={{
                      width: 1,
                      borderRadius: 3,
                    }}
                  />
                )}

                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 12, md: -24 },
                    bottom: -24,
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: theme.customShadows?.z16,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: alpha(
                          theme.palette.primary.main,
                          0.12
                        ),
                        color: 'primary.main',
                      }}
                    >
                      <Iconify
                        icon="solar:verified-check-bold"
                        width={22}
                      />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2">
                        Quality you can trust
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        Selected with care
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </MotionViewport>
          </Grid>

          <Grid xs={12} md={6}>
            <MotionViewport>
              <Stack spacing={3}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.main' }}
                >
                  More than a store
                </Typography>

                <Typography variant="h2">
                  Good products.
                  <br />
                  Simple shopping.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 560,
                  }}
                >
                  We believe shopping should be straightforward.
                  Browse products you actually want, discover something
                  unexpected, and check out without the clutter.
                </Typography>

                <Stack spacing={1.5}>
                  {[
                    'Thoughtfully selected products',
                    'Clear product information',
                    'Simple and secure checkout',
                  ].map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                    >
                      <Iconify
                        icon="solar:check-circle-bold"
                        color={theme.palette.primary.main}
                        width={22}
                      />

                      <Typography variant="body2">
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Box>
                  <Button
                    component={RouterLink}
                    href={paths.product.root}
                    variant="contained"
                    endIcon={<Iconify icon="solar:arrow-right-bold" />}
                  >
                    Start shopping
                  </Button>
                </Box>
              </Stack>
            </MotionViewport>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const renderFinalCta = (
    <Box sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <MotionViewport>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 4, md: 7 },
              borderRadius: 4,
              bgcolor: 'primary.darker',
              color: 'primary.contrastText',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.light, 0.14),
                filter: 'blur(50px)',
                top: -180,
                right: -80,
              }}
            />

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="space-between"
              spacing={4}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <Box sx={{ maxWidth: 650 }}>
                <Typography
                  variant="h3"
                  sx={{ color: 'inherit', mb: 1 }}
                >
                  Ready to find your next favorite?
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: alpha(
                      theme.palette.primary.contrastText,
                      0.72
                    ),
                  }}
                >
                  Take a look through the collection and discover
                  something worth bringing home.
                </Typography>
              </Box>

              <Button
                component={RouterLink}
                href={paths.product.root}
                size="large"
                variant="contained"
                color="primary"
                endIcon={<Iconify icon="solar:arrow-right-bold" />}
                sx={{
                  flexShrink: 0,
                  bgcolor: 'common.white',
                  color: 'primary.darker',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Browse products
              </Button>
            </Stack>
          </Box>
        </MotionViewport>
      </Container>
    </Box>
  );

  return (
    <>
      <Helmet>
        <title>Shop — Discover something you'll love</title>
        <meta
          name="description"
          content="Discover carefully selected products and shop our latest collection."
        />
      </Helmet>

      {renderHero}
      {renderBenefits}
      {renderCategories}
      {renderFeatured}
      {renderStory}
      {renderFinalCta}
  
    </>
  );
}

