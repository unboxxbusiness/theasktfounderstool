import { QuestionnaireForm } from "@/components/questionnaire-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ValidatePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Validate Your Startup Idea</CardTitle>
          <CardDescription>
            Fill out the form below to get an AI-powered analysis of your business concept. The more detail you provide, the more accurate your validation will be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionnaireForm />
        </CardContent>
      </Card>
    </div>
  );
}
