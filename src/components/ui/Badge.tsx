type ChipBadgeProps = {
  mode: "chip";
  active?: boolean;
  children: React.ReactNode;
};

type StatusBadgeProps = {
  mode: "status";
  status: "pending" | "completed" | "cancelled";
  children: React.ReactNode;
};

type BadgeProps = ChipBadgeProps | StatusBadgeProps;

const chipClasses = {
  active: "bg-primary text-white rounded-pill px-4 py-2 text-sm font-semibold",
  inactive: "bg-primary-tint text-primary rounded-pill px-4 py-2 text-sm font-semibold",
};

const statusClasses = {
  pending: "bg-amber-tint text-amber rounded-pill px-3 py-1 text-xs font-bold",
  completed: "bg-success-tint text-success rounded-pill px-3 py-1 text-xs font-bold",
  cancelled: "bg-danger-tint text-danger rounded-pill px-3 py-1 text-xs font-bold",
};

export function Badge(props: BadgeProps) {
  if (props.mode === "chip") {
    return (
      <span className={props.active ? chipClasses.active : chipClasses.inactive}>
        {props.children}
      </span>
    );
  }

  return <span className={statusClasses[props.status]}>{props.children}</span>;
}
