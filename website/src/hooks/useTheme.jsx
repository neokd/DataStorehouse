
import { useEffect, useState } from 'react'
function useTheme() {
    const [theme, setTheme] = useState('dark')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    useEffect(() => {
        const rootElement = document.documentElement;
        rootElement.classList.add(theme)
        rootElement.classList.remove(nextTheme)
    }, [theme,nextTheme])

  return [nextTheme,setTheme]
}
export default useTheme
