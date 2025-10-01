export const metadata = {
  title: "Employee Directory",
  description: "React app to track employee data"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <noscript>You need to enable JavaScript to run this app.</noscript>
    <!-- The below code was for debugging purposes on how the grid visibly operates -->
    <!-- <style>
      td, th {
        border: 1px solid green;
      }
    </style> --> */
          /* <script src="https://kit.fontawesome.com/b9c5498292.js" crossorigin="anonymous" />
     */}
        <div id="root">{children}</div>
      </body>
    </html>

  );
}
