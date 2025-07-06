import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {useMemo} from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    ...(prefersDarkMode
                        ? {
                            background: {
                                default: '#0F172A',
                                paper: '#1E293B',
                            },
                        }
                        : {
                            background: {
                                default: '#f8fafc',
                                paper: '#ffffff',
                            },
                        }),
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}