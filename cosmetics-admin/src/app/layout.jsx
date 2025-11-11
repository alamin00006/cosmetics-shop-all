import "@/css/satoshi.css";
import "@/css/style.css";
import { PrimeReactProvider } from "primereact/api";
import { Providers } from "@/redux/providers";

import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <PrimeReactProvider>
        <html lang="en">
          <body>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
            </div>
          </body>
        </html>
      </PrimeReactProvider>
    </Providers>
  );
}
