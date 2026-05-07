import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Playfair_Display,
} from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { THEME_IDS } from "@/lib/constants/themes";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Next.js",
  description: "dashboard playground next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
         * ThemeProvider: next-themes が提供するテーマ管理コンテキスト。
         *
         * attribute="class"
         *   テーマを <html class="dark"> のような CSS クラスで表現する。
         *   globals.css の .dark セレクタや Tailwind の dark: バリアントと連携する。
         *
         * themes={THEME_IDS}
         *   使用可能なテーマの ID 一覧。lib/constants/themes.ts の THEMES から自動生成する。
         *   新しいカラーテーマを追加したい場合は THEMES にエントリを追加するだけでよい。
         *
         * defaultTheme="light"
         *   localStorage にテーマが保存されていない初回訪問時のデフォルト値。
         *
         * enableSystem={false}
         *   OS の prefers-color-scheme（ダークモード設定）への自動追従を無効化する。
         *   light / dark を明示的に選択する仕様にするため false に設定している。
         *
         * disableTransitionOnChange
         *   テーマ切替時に CSS transition がチカチカ（FOIT）するのを防ぐ。
         *   切替瞬間だけ transition を無効にし、切替後は通常通りに戻る。
         */}
        <ThemeProvider
          attribute="class"
          themes={THEME_IDS}
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NuqsAdapter defaultOptions={{ shallow: false }}>
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
