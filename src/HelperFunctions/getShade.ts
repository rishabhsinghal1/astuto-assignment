export const getShade = (index: number) => {
  switch (index) {
    case 0:
      return "text-[#0080FF] bg-[#CCE6FF]";
    case 1:
      return "text-[#004D99] bg-[#99CCFF]";
    default:
      return "bg-[#66B3FF] text-[#003366]";
  }
};

export const getTooltipData = (data: string[]) => {
  return data.join(", ");
};
