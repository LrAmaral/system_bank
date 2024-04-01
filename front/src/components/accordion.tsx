import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface accordionProps {
  title: string;
  text: string;
}

export function Accord({ title, text }: accordionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{text}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
