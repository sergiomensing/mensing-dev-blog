"use client";

import {
  type ComponentProps,
  createContext,
  useContext,
  useId,
  useState,
} from "react";
import { Button, type ButtonProps } from "react-aria-components";

export type DisclosureContextValue = {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DisclosureContext = createContext<
  DisclosureContextValue | undefined
>(undefined);

const useDisclosureContext = () => {
  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error("Disclosure components must be used within a Disclosure");
  }

  return context;
};

export const Disclosure = (props: ComponentProps<"div">) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <DisclosureContext.Provider value={{ id, open, setOpen }}>
      <div {...props} data-open={open || undefined} />
    </DisclosureContext.Provider>
  );
};

export const DisclosureButton = (props: ButtonProps) => {
  const { open, setOpen, id } = useDisclosureContext();

  return (
    <Button
      {...props}
      aria-expanded={open}
      aria-controls={`panel-${id}`}
      onPress={(e) => {
        setOpen(!open);
        props.onPress?.(e);
      }}
    >
      {props.children}
    </Button>
  );
};

export const DisclosurePanel = (props: ComponentProps<"div">) => {
  const { open, id } = useDisclosureContext();

  return (
    <div
      {...props}
      id={`panel-${id}`}
      style={{ ...props.style, ...(open ? {} : { display: "none" }) }}
    />
  );
};
