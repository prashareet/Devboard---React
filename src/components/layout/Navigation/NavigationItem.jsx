import { NavLink } from "react-router-dom";

function NavigationItem({ label, path, icon: Icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-150",
          isActive
            ? "bg-indigo-500/10 text-indigo-400"
            : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-indigo-500" />
          )}

          <Icon
            className={[
              "h-4 w-4 shrink-0 transition-colors",
              isActive
                ? "text-indigo-400"
                : "text-zinc-500 group-hover:text-zinc-300",
            ].join(" ")}
          />

          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default NavigationItem;
