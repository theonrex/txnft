module.exports = {
  // You are missing this block that defines what files tailwind should scan for usage
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};
