import { Card, CardContent, CardHeader } from "../../components/ui/card";

const RightSection = () => {
  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="p-2">Right Side</CardHeader>
      <CardContent className="flex-1">Right Side Content</CardContent>
    </Card>
  );
};

export default RightSection;
