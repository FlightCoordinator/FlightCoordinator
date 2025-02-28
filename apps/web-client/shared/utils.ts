class Utils {
  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static boolToLabel(value: string | boolean): string {
    const parsedValue: string = String(value);
    if (parsedValue === "true") {
      return "Yes";
    }
    return "No";
  }
}
export default Utils;
