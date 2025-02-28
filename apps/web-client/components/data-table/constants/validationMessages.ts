interface MessageProps {
  message: string;
}

export const shouldBeStringMessage: MessageProps = { message: "This value should be a string." };
export const shouldBeNumberMessage: MessageProps = { message: "This value should be a number." };

export const nonEmptyMessage: MessageProps = { message: "This field is required" };
export const positiveMessage: MessageProps = { message: "This value should be greater than zero." };
export const nonNegativeMessage: MessageProps = { message: "This value should be greater than or equal to zero." };

export const invalidTimeMessage: MessageProps = { message: "Please enter a valid timestamp (HH:MM:SS)." };
export const invalidDateMessage: MessageProps = { message: "Please select a valid date." };
export const invalidEnumValueMessage: MessageProps = { message: "This value is not valid" };
export const invalidEmailMessage: MessageProps = { message: "Please enter a valid e-mail." };
