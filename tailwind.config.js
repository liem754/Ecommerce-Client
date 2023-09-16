/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}", ".public/index.html"],
    theme: {
        fontFamily: {
            main: ["Poppins", "sans-serif"],
        },
        extend: {
            keyframes: {
                "slide-bottom": {
                    "0%": {
                        "-webkit-transform": "translateY(-1000px)",
                        transform: "translateY(-1000px)",
                    },
                    "100%": {
                        "-webkit-transform": "translateY(0)",
                        transform: "translateY(0)",
                    },
                },
                "swing-top-fwd": {
                    "0%": {
                        "-webkit-transform": "rotateX(0)",
                        transform: "rotateX(0)",
                        "-webkit-transform-origin": "top",
                        "transform-origin": "top",
                    },
                    "100%": {
                        "-webkit-transform": "rotateX(180deg)",
                        transform: "rotateX(180deg)",
                        "-webkit-transform-origin": "top",
                        "transform-origin": "top",
                    },
                },
            },
            animation: {
                "slide-bottom":
                    "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
                "swing-top-fwd":
                    "swing-top-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
            },
            backgroundImage: {
                "background-home":
                    "url('https://i.pinimg.com/originals/9b/c0/8d/9bc08da3fab8d0903a7f56aa00fe9b7a.jpg')",
            },
        },
    },
    plugins: [],
};
