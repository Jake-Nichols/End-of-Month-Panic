import "./globals.css";

export const metadata = {
  title: "EPM Dashboard",
  description: "EPM appraisal dashboard for PR reviews, QC pass rates, and delivery metrics."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
