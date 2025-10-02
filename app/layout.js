import dynamic from "next/dynamic";
import Script from "next/script";

export const metadata = {
  title: "Employee Directory",
  description: "React app to track employee data"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://kit.fontawesome.com/b9c5498292.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>

  );
}

export default RootLayout;