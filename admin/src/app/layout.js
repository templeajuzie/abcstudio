import { Inter } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import { FileManagerProvider } from "@/context/FileManagerProvidert";
import { Provider } from "@/utils/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FileManagerProvider>
          <Provider>
            <AdminProvider>{children}</AdminProvider>
          </Provider>
        </FileManagerProvider>
      </body>
    </html>
  );
}
