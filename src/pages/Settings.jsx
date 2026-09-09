import { Database, Info, Keyboard, Monitor, ShieldCheck } from "lucide-react";

function Settings() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          Settings
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your DevBoard workspace and preferences.
        </p>
      </div>

      {/* Workspace */}
      <SettingsSection
        icon={Monitor}
        title="Workspace"
        description="Basic information about your current workspace."
      >
        <SettingRow
          label="Workspace name"
          description="The name used throughout your DevBoard workspace."
          value="DevBoard"
        />

        <SettingRow
          label="Environment"
          description="Current application environment."
          value="Frontend only"
        />
      </SettingsSection>

      {/* Data & Storage */}
      <SettingsSection
        icon={Database}
        title="Data & Storage"
        description="How DevBoard stores your workspace data."
      >
        <SettingRow
          label="Storage"
          description="Tasks and projects are persisted in your browser."
          value="localStorage"
        />

        <SettingRow
          label="Persistence"
          description="Your data remains available after refreshing the page."
          value="Enabled"
        />
      </SettingsSection>

      {/* Keyboard */}
      <SettingsSection
        icon={Keyboard}
        title="Keyboard & Usage"
        description="How you currently interact with DevBoard."
      >
        <SettingRow
          label="Create task"
          description="Create tasks using the Add Task action in the top bar."
          value="Top Bar"
        />

        <SettingRow
          label="Create project"
          description="Create projects from the Projects page."
          value="Projects"
        />
      </SettingsSection>

      {/* About */}
      <SettingsSection
        icon={Info}
        title="About DevBoard"
        description="Application information."
      >
        <SettingRow
          label="Version"
          description="Current DevBoard application version."
          value="1.0.0"
        />

        <SettingRow
          label="Architecture"
          description="React frontend with client-side persistence."
          value="React"
        />

        <div className="flex items-start gap-3 rounded-md border border-emerald-500/10 bg-emerald-500/5 p-4">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />

          <div>
            <p className="text-sm font-medium text-zinc-200">
              Local-first workspace
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              DevBoard currently stores workspace data locally in your browser.
              No backend or external database is required.
            </p>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
      <div className="flex items-start gap-3 border-b border-zinc-800 p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950">
          <Icon size={15} className="text-zinc-400" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-100">{title}</h3>

          <p className="mt-1 text-xs text-zinc-500">{description}</p>
        </div>
      </div>

      <div className="divide-y divide-zinc-800">{children}</div>
    </section>
  );
}

function SettingRow({ label, description, value }) {
  return (
    <div className="flex items-center justify-between gap-6 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-200">{label}</p>

        <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
      </div>

      <span className="shrink-0 rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-zinc-500">
        {value}
      </span>
    </div>
  );
}

export default Settings;
