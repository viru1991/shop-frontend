// import { useEffect } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import { alpha, styled, useTheme } from '@mui/material/styles';

// import { bgGradient } from 'src/theme/css';

// import Image from 'src/components/image';
// import Lightbox, { useLightBox } from 'src/components/lightbox';
// import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';

// // ----------------------------------------------------------------------

// const THUMB_SIZE = 64;

// const StyledThumbnailsContainer = styled('div')(({ length, theme }) => ({
//   position: 'relative',
//   margin: theme.spacing(0, 'auto'),
//   '& .slick-slide': {
//     lineHeight: 0,
//   },

//   ...(length === 1 && {
//     maxWidth: THUMB_SIZE * 1 + 16,
//   }),

//   ...(length === 2 && {
//     maxWidth: THUMB_SIZE * 2 + 32,
//   }),

//   ...((length === 3 || length === 4) && {
//     maxWidth: THUMB_SIZE * 3 + 48,
//   }),

//   ...(length >= 5 && {
//     maxWidth: THUMB_SIZE * 6,
//   }),

//   ...(length > 3 && {
//     '&:before, &:after': {
//       ...bgGradient({
//         direction: 'to left',
//         startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
//         endColor: `${theme.palette.background.default} 100%`,
//       }),
//       top: 0,
//       zIndex: 9,
//       content: "''",
//       height: '100%',
//       position: 'absolute',
//       width: (THUMB_SIZE * 2) / 3,
//     },
//     '&:after': {
//       right: 0,
//       transform: 'scaleX(-1)',
//     },
//   }),
// }));

// // ----------------------------------------------------------------------

// export default function ProductDetailsCarousel({ product }) {
//   const theme = useTheme();

//   const slides = product?.images?.map((img) => ({
//     src: img,
//   }));

//   const lightbox = useLightBox(slides);

//   const carouselLarge = useCarousel({
//     rtl: false,
//     draggable: false,
//     adaptiveHeight: true,
//     initialSlide: 0
//   });

//   const carouselThumb = useCarousel({
//     rtl: false,
//     centerMode: true,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     variableWidth: true,
//     centerPadding: '0px',
//     slidesToShow: slides?.length > 3 ? 3 : slides?.length,
//   });

//   useEffect(() => {
//     carouselLarge.onSetNav();
//     carouselThumb.onSetNav();
//   }, [carouselLarge, carouselThumb]);

//   useEffect(() => {
//     if (lightbox.open) {
//       carouselLarge.onTogo(lightbox.selected);
//     }
//   }, [carouselLarge, lightbox.open, lightbox.selected]);

  
  

//   const renderLargeImg = (
//     <Box
//       sx={{
//         mb: 3,
//         borderRadius: 2,
//         overflow: 'hidden',
//         position: 'relative',
//       }}
//     >
//       <Carousel
//         {...carouselLarge.carouselSettings}
//         asNavFor={carouselThumb.nav}
//         ref={carouselLarge.carouselRef}
//       >
//         {slides?.map((slide) => (
//           <Image
//             key={slide.src}
//             alt={slide.src}
//             src={slide.src}
//             ratio="1/1"
//             onClick={() => lightbox.onOpen(slide.src)}
//             sx={{ cursor: 'zoom-in' }}
//           />
//         ))}
//       </Carousel>

//       <CarouselArrowIndex
//         index={carouselLarge?.currentIndex}
//         total={slides?.length || 0}
//         onNext={carouselThumb?.onNext}
//         onPrev={carouselThumb?.onPrev}
//       />
//     </Box>
//   );
//   const renderThumbnails = (
//     <StyledThumbnailsContainer length={slides?.length}>
//       <Carousel
//         {...carouselThumb.carouselSettings}
//         asNavFor={carouselLarge.nav}
//         ref={carouselThumb.carouselRef}
//       >
//         {slides?.map((item, index) => (
//           <>
//           <Box key={item.src} sx={{ px: 0.5 }}>
//             <Avatar
//               key={item.src}
//               alt={item.src}
//               src={item.src}
//               variant="rounded"
//               sx={{
//                 width: THUMB_SIZE,
//                 height: THUMB_SIZE,
//                 opacity: 0.48,
//                 cursor: 'pointer',
//                 ...(carouselLarge?.currentIndex === index && {
//                   opacity: 1,
//                   border: `solid 2.5px ${theme.palette.primary.main}`,
//                 }),
//               }}
//             />
//           </Box>
//           </>
//         ))}
//       </Carousel>
//     </StyledThumbnailsContainer>
//   );

//   return (
//     <Box
//       sx={{
//         '& .slick-slide': {
//           float: theme.direction === 'rtl' ? 'right' : 'left',
//         },
//       }}
//     >
//       {renderLargeImg}

//       {renderThumbnails}

//       <Lightbox
//         index={lightbox.selected}
//         slides={slides}
//         open={lightbox.open}
//         close={lightbox.onClose}
//         onGetCurrentIndex={(index) => lightbox.setSelected(index)}
//       />
//     </Box>
//   );
// }

// ProductDetailsCarousel.propTypes = {
//   product: PropTypes.object,
// };






// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import { alpha, styled, useTheme } from '@mui/material/styles';

// import { bgGradient } from 'src/theme/css';

// import Image from 'src/components/image';
// import Lightbox, { useLightBox } from 'src/components/lightbox';
// import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';

// // ----------------------------------------------------------------------

// const THUMB_SIZE = 64;

// const StyledThumbnailsContainer = styled('div')(({ length, theme }) => ({
//   position: 'relative',
//   margin: theme.spacing(0, 'auto'),
//   '& .slick-slide': {
//     lineHeight: 0,
//   },

//   ...(length === 1 && {
//     maxWidth: THUMB_SIZE * 1 + 16,
//   }),

//   ...(length === 2 && {
//     maxWidth: THUMB_SIZE * 2 + 32,
//   }),

//   ...((length === 3 || length === 4) && {
//     maxWidth: THUMB_SIZE * 3 + 48,
//   }),

//   ...(length >= 5 && {
//     maxWidth: THUMB_SIZE * 6,
//   }),

//   ...(length > 3 && {
//     '&:before, &:after': {
//       ...bgGradient({
//         direction: 'to left',
//         startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
//         endColor: `${theme.palette.background.default} 100%`,
//       }),
//       top: 0,
//       zIndex: 9,
//       content: "''",
//       height: '100%',
//       position: 'absolute',
//       width: (THUMB_SIZE * 2) / 3,
//     },
//     '&:after': {
//       right: 0,
//       transform: 'scaleX(-1)',
//     },
//   }),
// }));

// // ----------------------------------------------------------------------

// export default function ProductDetailsCarousel({ product }) {
//   const theme = useTheme();

//   // const slides = product?.images?.map((img) => ({
//   //   src: img,
//   // })) || [];

//     const slides = product?.images?.length
//     ? product.images.map((img) => ({ src: img }))
//     : [];

//   const lightbox = useLightBox(slides);

//   const carouselLarge = useCarousel({
//     rtl: false,
//     draggable: false,
//     adaptiveHeight: true,
//     initialSlide: 0
//   });

//   const carouselThumb = useCarousel({
//     rtl: false,
//     centerMode: true,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     variableWidth: true,
//     centerPadding: '0px',
//     slidesToShow: slides?.length > 3 ? 3 : slides?.length,
//   });

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 👉 Set up navs
//   useEffect(() => {
//     carouselLarge.onSetNav();
//     carouselThumb.onSetNav();
    
//   }, [carouselLarge, carouselThumb]);

//   // 👉 Force large carousel to index 0 on mount
//   useEffect(() => {
//     if (carouselLarge.carouselRef.current && slides.length) {
//       carouselLarge.carouselRef.current?.slickGoTo(0,true);
//       setCurrentIndex(0);
//     }
//   }, [carouselLarge.carouselRef.current,slides.length]);

//   // 👉 Sync lightbox selection
//   useEffect(() => {
//     if (lightbox.open) {
//       carouselLarge.carouselRef.current?.slickGoTo(lightbox.selected);
//       setCurrentIndex(lightbox.selected);
//     }
//   }, [carouselLarge, lightbox.open, lightbox.selected]);

//   const renderLargeImg = (
//     <Box
//       sx={{
//         mb: 3,
//         borderRadius: 2,
//         overflow: 'hidden',
//         position: 'relative',
//       }}
//     >
//       <Carousel
//         {...carouselLarge.carouselSettings}
//         asNavFor={carouselThumb.nav}
//         ref={carouselLarge.carouselRef}
//         beforeChange={(_, next) => setCurrentIndex(next)}
//       >
//         {slides.map((slide) => (
//           <Image
//             key={slide.src}
//             alt={slide.src}
//             src={slide.src}
//             ratio="1/1"
//             onClick={() => lightbox.onOpen(slide.src)}
//             sx={{ cursor: 'zoom-in' }}
//           />
//         ))}
//       </Carousel>

//       <CarouselArrowIndex
//         index={currentIndex}
//         total={slides.length}
//         onNext={carouselThumb.onNext}
//         onPrev={carouselThumb.onPrev}
//       />
//     </Box>
//   );

//   const renderThumbnails = (
//     <StyledThumbnailsContainer length={slides.length}>
//       <Carousel
//         {...carouselThumb.carouselSettings}
//         asNavFor={carouselLarge.nav}
//         ref={carouselThumb.carouselRef}
//       >
//         {slides.map((item, index) => (
//           <Box key={item.src} sx={{ px: 0.5 }}>
//             <Avatar
//               alt={item.src}
//               src={item.src}
//               variant="rounded"
//               onClick={() => {
//                 carouselLarge.carouselRef.current?.slickGoTo(index,true);
//                 setCurrentIndex(index);
//               }}
//               sx={{
//                 width: THUMB_SIZE,
//                 height: THUMB_SIZE,
//                 opacity: 0.48,
//                 cursor: 'pointer',
//                 ...(currentIndex === index && {
//                   opacity: 1,
//                   border: `solid 2.5px ${theme.palette.primary.main}`,
//                 }),
//               }}
//             />
//           </Box>
//         ))}
//       </Carousel>
//     </StyledThumbnailsContainer>
//   );

//   return (
//     <Box
//       sx={{
//         '& .slick-slide': {
//           float: theme.direction === 'rtl' ? 'right' : 'left',
//         },
//       }}
//     >
//       {renderLargeImg}

//       {renderThumbnails}

//       <Lightbox
//         index={lightbox.selected}
//         slides={slides}
//         open={lightbox.open}
//         close={lightbox.onClose}
//         onGetCurrentIndex={(index) => lightbox.setSelected(index)}
//       />
//     </Box>
//   );
// }

// ProductDetailsCarousel.propTypes = {
//   product: PropTypes.object,
// };




import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import Carousel, { CarouselArrowIndex } from 'src/components/carousel';

const THUMB_SIZE = 64;

const StyledThumbnailsContainer = styled('div')(({ length, theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  '& .slick-slide': {
    lineHeight: 0,
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),

  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),

  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),

  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),

  ...(length > 3 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

export default function ProductDetailsCarousel({ product }) {
  const theme = useTheme();

  const slides = product?.images?.length
    ? product.images.map((img) => ({ src: img }))
    : [];

  const lightbox = useLightBox(slides);

  const mainRef = useRef(null);
  const thumbRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // 🟢 On mount: go to first slide if there are slides
  // useEffect(() => {
  //   if (slides.length && mainRef.current) {
  //     mainRef.current.slickGoTo(0);
  //     setCurrentIndex(0);
  //   }
  // }, [slides.length]);

  // 🟢 When lightbox opens: sync index
  useEffect(() => {
    if (lightbox.open && mainRef.current) {
      mainRef.current.slickGoTo(lightbox.selected);
      setCurrentIndex(lightbox.selected);
    }
  }, [lightbox.open, lightbox.selected]);

  // 🟢 Handlers for next/prev
  const handleNext = () => {
    if (mainRef.current) {
      mainRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (mainRef.current) {
      mainRef.current.slickPrev();
    }
  };

  return (
    slides.length > 0 && (
      <Box
        sx={{
          '& .slick-slide': {
            float: theme.direction === 'rtl' ? 'right' : 'left',
          },
        }}
      >
        {/* Main image */}
        <Box
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Carousel
            slidesToShow={1}
            adaptiveHeight
            asNavFor={thumbRef.current}
            ref={mainRef}
            beforeChange={(_, next) => setCurrentIndex(next)}
          >
            {slides.map((slide) => (
              <Image
                key={slide.src}
                alt={slide.src}
                src={slide.src}
                ratio="1/1"
                onClick={() => lightbox.onOpen(slide.src)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))}
          </Carousel>

          <CarouselArrowIndex
            index={currentIndex}
            total={slides.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </Box>

        {/* Thumbnails */}
        <StyledThumbnailsContainer length={slides.length}>
          <Carousel
            centerMode
            swipeToSlide
            focusOnSelect
            variableWidth
            centerPadding="0px"
            slidesToShow={slides.length > 3 ? 3 : slides.length}
            asNavFor={mainRef.current}
            ref={thumbRef}
          >
            {slides.map((item, index) => (
              <Box key={item.src} sx={{ px: 0.5 }}>
                <Avatar
                  alt={item.src}
                  src={item.src}
                  variant="rounded"
                  onClick={() => {
                    mainRef.current?.slickGoTo(index);
                    setCurrentIndex(index);
                  }}
                  sx={{
                    width: THUMB_SIZE,
                    height: THUMB_SIZE,
                    opacity: currentIndex === index ? 1 : 0.48,
                    cursor: 'pointer',
                    ...(currentIndex === index && {
                      border: `solid 2.5px ${theme.palette.primary.main}`,
                    }),
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </StyledThumbnailsContainer>

        <Lightbox
          index={lightbox.selected}
          slides={slides}
          open={lightbox.open}
          close={lightbox.onClose}
          onGetCurrentIndex={(index) => lightbox.setSelected(index)}
        />
      </Box>
    )
  );
}

ProductDetailsCarousel.propTypes = {
  product: PropTypes.object,
};
