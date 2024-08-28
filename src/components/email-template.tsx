import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div>
    <h1>from: {fullName}!</h1>
    <div className="text-red-500">{email} sent you a message</div>
    <blockquote>{message}</blockquote>
  </div>
);
