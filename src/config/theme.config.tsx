import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
type ThemeProp = {
  children: JSX.Element
};
export enum themePalette {
  BG = '#000000',
  RED = '#ff0000',
  FONT_GLOBAL = 'Cascadia Code',
  //Alert styled
  ERROR_MAIN = '#F44336',
  BG_ERROR_MAIN = 'rgba(244, 67, 54, 0.5)',
  SUCCESS_MAIN = '#66BB6A',
  BG_SUCCESS_MAIN = 'rgba(0,255,30,0.5)',
  WARNING_MAIN = '#FFA720',
  BG_WARNING_MAIN = 'rgba(217,164,38,0.5)',
  INFO_MAIN = '#2196f3',
  BG_INFO_MAIN = 'rgba(0,119,255,0.5)',
};
const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      background: {
        default: themePalette.BG,
      },
      primary: {
        main: themePalette.RED,
      },
      secondary: {
        main: themePalette.BG,
      },
    },
    typography: {
      fontFamily: themePalette.FONT_GLOBAL,
    },
    components: {
      MuiButton: {
        defaultProps: {
          style: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '0.5em',
          }
        }
      },
      MuiAlert: {
        defaultProps: {
          style: {
            borderRadius: '0.8em',
            fontSize: '1em',
          },
        },
        styleOverrides: {
          standardError: {
            border: `1px solid ${themePalette.ERROR_MAIN}`,
            backgroundColor: themePalette.BG_ERROR_MAIN,
          },
          standardSuccess: {
            border: `1px solid ${themePalette.SUCCESS_MAIN}`,
            backgroundColor: themePalette.BG_SUCCESS_MAIN,
          },
          standardWarning: {
            border: `1px solid ${themePalette.WARNING_MAIN}`,
            backgroundColor: themePalette.BG_WARNING_MAIN,
          },
          standardInfo: {
            border: `1px solid ${themePalette.INFO_MAIN}`,
            backgroundColor: themePalette.BG_INFO_MAIN,
          },
        },
      },
    },
  }
);
export const ThemeConfig: React.
  FC<ThemeProp> = ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  };