import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";
export type IIcon =
  | "search"
  | "edit"
  | "check"
  | "message"
  | "star-off"
  | "delete"
  | "add"
  | "share";

export const JSXButtonProps = {
  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },
  icon: {
    type: String as PropType<IIcon>,
  },
};

export default defineComponent({
  name: "JSXButton",
  props: JSXButtonProps,
  setup(props, { slots }) {
    return () => (
      <button
        class={`
      py-2
      px-4
      text-white
      text-sm
      bg-${props.color}-500
      hover:bg-${props.color}-700
      border-none
      rounded
      cursor-pointer
    `}
      >
        {props.icon && <i class={`i-ic-baseline-${props.icon} p-3`}></i>}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});
