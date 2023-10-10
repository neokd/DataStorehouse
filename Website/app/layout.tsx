import './globals.css'
import type { Metadata } from 'next'
import { Inter , Nunito, Roboto } from 'next/font/google'
import { ThemeProvider } from './theme/theme-provider';
import { ThemeSwitcher } from './theme/ThemeSwitcher';
import { switchThemeDuration } from './theme/switch-theme';

const nunitoNormal = Nunito({weight: ['400'], subsets: ['latin']})

export const metadata: Metadata = {
  title: 'DataStoreHouse',
  description: 'An Open Source Project for Datasets for your next AI/ML or Data Science Project',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-white/60 via-violet-200 to-white dark:from-black dark:via-violet-800/25 dark:to-gray-950/60 duration-1000 ${switchThemeDuration}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
