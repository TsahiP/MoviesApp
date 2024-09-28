import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#ff4081', // Custom secondary color
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#1976d2', // Custom color for selected pagination item
            color: '#fff', // Text color for selected item
          },
          '&:hover': {
            backgroundColor: '#115293', // Hover effect for pagination item
          },
        },
      },
    },
  },
});

const MyPagination = () => {
  return (
    <ThemeProvider theme={theme}>
      <Pagination count={10} color="primary" />
    </ThemeProvider>
  );
};

export default MyPagination;
