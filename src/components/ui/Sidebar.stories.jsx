import { Sidebar } from "./Sidebar";

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "close" },
  },
};

export const Desktop = {
  args: {
    open: true,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const MobileOpen = {
  args: {
    open: true,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const MobileClosed = {
  args: {
    open: false,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}; 