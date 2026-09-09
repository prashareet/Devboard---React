import AppIdentity from "./App Identity/AppIdentity.jsx";
import Navigation from "./Navigation/Navigation.jsx";

function Sidebar() {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col rounded-lg border border-zinc-800 bg-zinc-900/70 p-4">
      <AppIdentity />

      <div className="mt-8 flex-1">
        <Navigation />
      </div>
    </aside>
  );
}

export default Sidebar;
