import GlobalTypes from "@/types/globals";

import labelValueObjects from "../constants/labelValueObjects";

export function getLabelValueObject<K extends keyof typeof labelValueObjects>(
  labelValueSection: K,
  enumValue: keyof (typeof labelValueObjects)[K],
): GlobalTypes.LabelValuePairProps {
  return labelValueObjects[labelValueSection][enumValue] as GlobalTypes.LabelValuePairProps;
}

export function getAllLabelsOf<K extends keyof typeof labelValueObjects>(labelValueSection: K): [string, ...string[]] {
  const items: string[] = Object.values(labelValueObjects[labelValueSection]).map((item) => item.label);
  return items.length > 1 ? [items[0], ...items.slice(1)] : [items[0]];
}

export function getAllValuesOf<K extends keyof typeof labelValueObjects>(labelValueSection: K): [string, ...string[]] {
  const items: string[] = Object.keys(labelValueObjects[labelValueSection]);
  return items.length > 1 ? [items[0], ...items.slice(1)] : [items[0]];
}
