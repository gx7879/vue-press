import { ref, computed } from "vue";
export default function useButton(props) {
  const style = {
    primary: [
      "bg-violet-500",
      "text-white",
      "hover:bg-violet-600",
      "focus:ring-violet-500",
      "disabled:bg-violet-400",
    ],
    secondary: [
      "bg-white",
      "border-gray-300",
      "text-gray-700",
      "hover:bg-gray-100",
      "focus:ring-violet-500",
      "disabled:bg-white",
      "disabled:text-gray-400",
    ],
    danger: [
      "bg-red-500",
      "text-white",
      "hover:bg-red-600",
      "focus:ring-red-500",
      "disabled:bg-red-400",
    ],
  };
  const getTag = () => {
    if (props.to) {
      return "RouterLink";
    } else {
      return props.is;
    }
  };
  const variantVal = ref(props.variant);
  const buttonStyle = computed(() => {
    console.log(style);
    return style[variantVal.value];
  });
  const tag = ref(getTag());
  const buttonType = ref(tag.value === "button" ? props.type : null);
  return { variantVal, buttonStyle, tag, buttonType };
}
