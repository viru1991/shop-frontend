import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <g transform="translate(0, 0) scale(4.5)">
          {/* <path  fill="url(#BG1)" d="M0 19.20L0.55 13.45L24.30 13.45L23.75 19.20L15.05 18.45L14.85 34.95L15.45 47.95L8.45 47.95L9.05 35.80L8.85 18.50L0 19.20ZM50 12.95Q55.90 12.95 59.73 17.45Q63.55 21.95 63.55 28.90Q63.55 37.70 59 43.10Q54.45 48.50 47.05 48.50Q41.30 48.50 37.40 43.87Q33.50 39.25 33.50 32.45Q33.50 23.95 38.15 18.45Q42.80 12.95 50 12.95M56.75 31.70Q56.75 19.05 48.45 19.05Q44.65 19.05 42.48 21.87Q40.30 24.70 40.30 30.32Q40.30 35.95 42.63 39.57Q44.95 43.20 48.78 43.20Q52.60 43.20 54.67 40.12Q56.75 37.05 56.75 31.70ZM76.75 47.95L77.35 35.80L76.75 13.45L95.50 13.45L94.95 18.80L83.70 18.80L83.40 27.65L93.40 27.65L92.85 32.95L83.20 32.95L83.15 34.95L83.50 42.65L95.60 42.65L95.05 47.95L76.75 47.95Z"/> */}
          <path  fill="url(#BG1)" d="M0 19.20L0.55 13.45L24.30 13.45L23.75 19.20L15.05 18.45L14.85 34.95L15.45 47.95L8.45 47.95L9.05 35.80L8.85 18.50L0 19.20ZM50 12.95Q55.90 12.95 59.73 17.45Q63.55 21.95 63.55 28.90Q63.55 37.70 59 43.10Q54.45 48.50 47.05 48.50Q41.30 48.50 37.40 43.87Q33.50 39.25 33.50 32.45Q33.50 23.95 38.15 18.45Q42.80 12.95 50 12.95M56.75 31.70Q56.75 19.05 48.45 19.05Q44.65 19.05 42.48 21.87Q40.30 24.70 40.30 30.32Q40.30 35.95 42.63 39.57Q44.95 43.20 48.78 43.20Q52.60 43.20 54.67 40.12Q56.75 37.05 56.75 31.70ZM76.75 47.95L77.35 35.80L76.75 13.45L95.50 13.45L94.95 18.80L83.70 18.80L83.40 27.65L93.40 27.65L92.85 32.95L83.20 32.95L83.15 34.95L83.50 42.65L95.60 42.65L95.05 47.95L76.75 47.95Z"/>
          </g>
          <g transform="translate(10, 220) scale(4)">
            <path fill="url(#BG3)" d="M3.45 23.75L3.45 18.30L10.20 17.00L9.55 23.75L15.60 23.75L15.05 27.85L9.35 27.85L9.10 38.30Q9.10 40.65 9.55 41.42Q10 42.20 11.20 42.20Q12.40 42.20 14.40 41.65L14.70 45.20Q11.40 47.95 8.90 47.95Q6.40 47.95 4.80 46.12Q3.20 44.30 3.20 41.35L3.50 35.75L3.45 27.85L0 27.85L0.55 23.75L3.45 23.75ZM17.75 37.50Q17.75 31.10 21.20 26.65Q24.65 22.20 29.28 22.20Q33.90 22.20 36.48 25.20Q39.05 28.20 39.05 33.15Q39.05 39.75 35.73 44.12Q32.40 48.50 27.35 48.50Q23.20 48.50 20.48 45.37Q17.75 42.25 17.75 37.50M33.45 35.75Q33.45 28.50 28.50 28.50Q23.35 28.50 23.35 35.30Q23.35 38.85 24.80 40.85Q26.25 42.85 28.63 42.85Q31 42.85 32.23 41.02Q33.45 39.20 33.45 35.75ZM40.45 19.20L41 13.45L64.75 13.45L64.20 19.20L55.50 18.45L55.30 34.95L55.90 47.95L48.90 47.95L49.50 35.80L49.30 18.50L40.45 19.20ZM66.15 37.50Q66.15 31.10 69.60 26.65Q73.05 22.20 77.67 22.20Q82.30 22.20 84.88 25.20Q87.45 28.20 87.45 33.15Q87.45 39.75 84.13 44.12Q80.80 48.50 75.75 48.50Q71.60 48.50 68.88 45.37Q66.15 42.25 66.15 37.50M81.85 35.75Q81.85 28.50 76.90 28.50Q71.75 28.50 71.75 35.30Q71.75 38.85 73.20 40.85Q74.65 42.85 77.03 42.85Q79.40 42.85 80.63 41.02Q81.85 39.20 81.85 35.75ZM100.75 42.85Q102.20 42.85 103.80 42.10Q105.40 41.35 106.30 40.60L107.20 39.85L109.50 42.65Q109 43.50 107.95 44.60Q106.90 45.70 105.82 46.47Q104.75 47.25 102.97 47.87Q101.20 48.50 99.30 48.50Q95.25 48.50 92.70 45.42Q90.15 42.35 90.15 37.50Q90.15 31.40 93.70 26.80Q97.25 22.20 102 22.20Q105.65 22.20 107.67 24.25Q109.70 26.30 109.70 30.00Q109.70 32.20 108.95 35.00L107.95 36.05L95.45 37.20Q96.30 42.85 100.75 42.85M100.75 27.35Q98.55 27.35 97.05 29.12Q95.55 30.90 95.30 33.65L103.80 32.60Q103.95 31.45 103.95 30.70Q103.95 27.35 100.75 27.35Z"/>
          </g>
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;


// ***-------------------------------------------------------------------***
// textLogo

// import PropTypes from 'prop-types';
// import { forwardRef } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';

// import { RouterLink } from 'src/routes/components';

// // ----------------------------------------------------------------------

// const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
//   const theme = useTheme();

//   const PRIMARY_MAIN = theme.palette.primary.main;

//   const logo = (
//     <Box
//       ref={ref}
//       component="div"
//       sx={{
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: PRIMARY_MAIN,
//         fontWeight: 'bold',
//         fontSize: 24,
//         letterSpacing: 1,
//         ...sx,
//       }}
//       {...other}
//     >
//       <Typography
//         variant="h5"
//         component="span"
//         sx={{
//           color: 'inherit',
//           fontWeight: 'bold',
//           textDecoration: 'none',
//         }}
//       >
//         ToeToToe
//       </Typography>
//     </Box>
//   );

//   if (disabledLink) {
//     return logo;
//   }

//   return (
//     <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
//       {logo}
//     </Link>
//   );
// });

// Logo.propTypes = {
//   disabledLink: PropTypes.bool,
//   sx: PropTypes.object,
// };

// export default Logo;

// *****--------------------------------------------------------***********

// import PropTypes from 'prop-types';
// import { forwardRef } from 'react';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

// import { RouterLink } from 'src/routes/components';

// // ----------------------------------------------------------------------

// const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
//   const theme = useTheme();

//   const PRIMARY_LIGHT = theme.palette.primary.light;
//   const PRIMARY_MAIN = theme.palette.primary.main;
//   const PRIMARY_DARK = theme.palette.primary.dark;

//   const logo = (
//     <Box
//       ref={ref}
//       component="div"
//       sx={{
//         width: 160, // wider for text
//         height: 160,
//         display: 'inline-flex',
//         ...sx,
//       }}
//       {...other}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="100%"
//         height="100%"
//         viewBox="0 0 512 100"
//       >
//         <defs>
//           <linearGradient id="TextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor={PRIMARY_DARK} />
//             <stop offset="100%" stopColor={PRIMARY_MAIN} />
//           </linearGradient>
//         </defs>

//         <text
//           x="50%"
//           y="50%"
//           textAnchor="middle"
//           dominantBaseline="middle"
//           fontFamily="Nunito Sans, Segoe UI, sans-serif"
//           fontSize="64"
//           fontWeight="800"
//           fill="url(#TextGradient)"
//         >
//           ToeToToe
//         </text>
//       </svg>
//     </Box>
//   );

//   if (disabledLink) {
//     return logo;
//   }

//   return (
//     <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
//       {logo}
//     </Link>
//   );
// });

// Logo.propTypes = {
//   disabledLink: PropTypes.bool,
//   sx: PropTypes.object,
// };

// export default Logo;
