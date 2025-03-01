import React from "react";

import { X as False, Check as True } from "lucide-react";

interface BoolDisplayProps {
  value: boolean;
}

const styles: string = "w-4 h-4 min-w-4 min-h-4";

const BoolDisplay = ({ value }: BoolDisplayProps) => {
  return value === true ? <True className={styles} /> : <False className={styles} />;
};

export default BoolDisplay;
