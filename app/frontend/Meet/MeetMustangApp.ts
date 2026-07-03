// Stub for the removed proprietary Meet app. MustangApp objects are used both as
// Svelte stores ($meetMustangApp) and as plain objects (meetMustangApp.icon), so
// this exposes a no-op `subscribe` (emitting itself) plus inert props.
export const meetMustangApp: any = {
  id: "meet",
  name: "Meet",
  icon: null,
  mainWindow: null,
  showSidebar: false,
  subscribe(run: (value: any) => void) {
    run(meetMustangApp);
    return () => {};
  },
};
