import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});


import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<MUIThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</MUIThemeProvider>
		</ThemeProvider>
	)
}
