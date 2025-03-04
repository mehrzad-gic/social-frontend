// src/ThemeSwitcher.jsx  
import { useEffect } from 'react';  

const ThemeSwitcher = () => {  
    
    const storedTheme = localStorage.getItem('theme');  

    const getPreferredTheme = () => {  
        if (storedTheme) {  
            return storedTheme;  
        }  
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';  
    };  

    const setTheme = (theme) => {  
        document.documentElement.setAttribute('data-bs-theme', theme);  
    };  

    const showActiveTheme = (theme) => {  
        const activeThemeIcon = document.querySelector('.theme-icon-active use');  
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);  

        // Guard clause to prevent errors if btnToActive is null  
        if (!btnToActive) {  
            console.warn(`No button found for theme: ${theme}`);  
            return;   
        }  

        const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use')?.getAttribute('href');  

        // Debugging: Check if the SVG reference is found  

        document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {  
            element.classList.remove('active');  
        });  

        btnToActive.classList.add('active');  
        if (activeThemeIcon && svgOfActiveBtn) {  
            activeThemeIcon.setAttribute('href', svgOfActiveBtn);  
        }  
    };  

    useEffect(() => {  
        const initialTheme = getPreferredTheme();  
        setTheme(initialTheme);  
        showActiveTheme(initialTheme);  

        const mediaQueryListener = window.matchMedia('(prefers-color-scheme: dark)');  
        const handleMediaChange = () => {  
            const newTheme = getPreferredTheme();  
            console.log('Media query changed. New theme:', newTheme); // Log theme on media query change  
            setTheme(newTheme);  
            showActiveTheme(newTheme);  
        };  

        mediaQueryListener.addEventListener('change', handleMediaChange);  

        // Declare the handler function outside the loop  
        const handleToggleClick = (toggle) => {  
            const theme = toggle.getAttribute('data-bs-theme-value');  
            localStorage.setItem('theme', theme);  
            setTheme(theme);  
            showActiveTheme(theme);  
        };  

        const toggles = document.querySelectorAll('[data-bs-theme-value]');  
        toggles.forEach((toggle) => {  
            const handleToggle = () => handleToggleClick(toggle);  // Create handler that captures the toggle reference  
            toggle.addEventListener('click', handleToggle);  
            toggle._handleToggle = handleToggle; // Save reference for cleanup  
        });  

        // Cleanup function  
        return () => {  
            mediaQueryListener.removeEventListener('change', handleMediaChange);  
            toggles.forEach((toggle) => {  
                toggle.removeEventListener('click', toggle._handleToggle); // Use stored reference for cleanup  
            });  
        };  
    }, [storedTheme]);  

    return null; // You can replace this with your implementation to render buttons/icons  
};  

export default ThemeSwitcher;