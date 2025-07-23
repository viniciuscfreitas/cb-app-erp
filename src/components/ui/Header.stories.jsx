import { Header } from "./Header";

export default {
  title: "Layout/Header",
  component: Header,
  argTypes: {
    user: { control: "text" },
    onMenuClick: { action: "menuClick" },
  },
};

export const Default = {
  args: {
    user: "Dra. Ana Paula",
  },
}; 