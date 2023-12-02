import Switch from "@/ui/Switch";

export default function ThemeSwitch() {
  const prefersDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return <Switch id="toggle-theme" defaultChecked={prefersDark} />;
}
