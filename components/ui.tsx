import classed from "tw-classed";

export const Input = classed(
  "input",
  "px-3 py-2 rounded-md border border-gray-500 outline-none bg-transparent transition-colors",
  "focus:text-supabase focus:border-supabase hover:border-supabase hover:placeholder-supabase"
);

export const Button = classed(
  "button",
  "px-3 py-2 rounded-md outline-none block bg-supabase bg-opacity-75 hover:bg-opacity-80",
  "transition-colors"
);
