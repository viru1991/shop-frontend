import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
// import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function ProductSearch({ query, results, onSearch, hrefItem, loading }) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectItem = results.filter((product) => product.name === query)[0];

        handleClick(selectItem.id);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name}
      // noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const matches = match(product.name, inputValue);
        const parts = parse(product.name, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(product?._id)} key={product?._id}>
            <Avatar
              key={product?._id}
              alt={product.name}
              src={product.coverUrl}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}

ProductSearch.propTypes = {
  hrefItem: PropTypes.func,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
};
