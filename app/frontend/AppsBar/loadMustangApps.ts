import { contactsMustangApp } from "../Contacts/ContactsMustangApp";
import { mailMustangApp } from "../Mail/MailMustangApp";
import { calendarMustangApp } from "../Calendar/CalendarMustangApp";
// #if [!WEBMAIL]
import { filesMustangApp } from "../Files/FilesMustangApp";
// #endif
import { settingsMustangApp } from "../Settings/Window/SettingsMustangApp";
import { mustangApps, selectedApp } from "./selectedApp";

/**
 * Clean Solutrix shell: the core PIM apps only.
 *
 * Upstream Mustang loaded a demo app list (Chat / Meet / WebApps / Topic) plus
 * fake seed data whenever `production` was false. We deliberately drop that so
 * Hugin starts from an empty, well-defined shell; Solutrix features get added
 * here on purpose as they are built.
 */
export function loadMustangApps() {
  mustangApps.replaceAll([
    mailMustangApp,
    contactsMustangApp,
    calendarMustangApp,
    // #if [!WEBMAIL]
    filesMustangApp,
    // #endif
    settingsMustangApp,
  ]);
  selectedApp.set(mailMustangApp);
}
