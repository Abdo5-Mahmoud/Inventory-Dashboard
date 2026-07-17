import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export function ProductCardComponent({
  title,
  description,
  content,
  footer,
  className,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`py-2 ${className}`}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <div className="">{content}</div>
        </CardContent>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
