export type MemberNamePlateProps = {
  label: string;
  fullName?: string;
  isSelected?: boolean;
};

export function MemberNamePlate({
  label,
  fullName,
  isSelected = false,
}: MemberNamePlateProps) {
  return (
    <span
      className={`member-name-plate ${isSelected ? "selected" : ""}`}
      title={fullName && fullName !== label ? fullName : undefined}
    >
      {label}
    </span>
  );
}
